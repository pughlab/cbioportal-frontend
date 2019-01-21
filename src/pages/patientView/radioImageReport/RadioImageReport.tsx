import * as React from "react";
import styles from "../clinicalInformation/style/radiologyReport.module.scss";
import DefaultTooltip from "../../../shared/components/defaultTooltip/DefaultTooltip";
import Plot from "react-plotly.js";
import * as plotly from 'plotly.js';
import Select from 'react-select';
import {LAYOUT, ImageROIData, ImageAnalysisData, ImageUnitData, MODOPTIONS, STATSOPTIONS} from './RadioImageMeta';

export interface IPatientRadioImageProps {
    patientId: string;
    studyId: string;
}

export default class RadioImageReport extends React.Component<IPatientRadioImageProps,
                    {[propName: string]: any}> {

    constructor(props: IPatientRadioImageProps) {
        super(props);
        this.state = {
            analysisData: [],
            layout: LAYOUT,
            selectedModOption: [],
            selectedStatsOption: {},
            img: '',
            imgROI: '',
            oldImg: '',
            oldImgROI: '',
            imgToolTip: {},
            oldImgeToolTip: {},
            statOptions: STATSOPTIONS,
            modOptions: MODOPTIONS,
            plotData: []
        };
    }

    componentDidMount() {
        const docFile = '/cbioportal/images/' + this.props.studyId + "/"+
                        this.props.patientId + "/" + this.props.patientId + ".json";
        fetch(window.location.origin + docFile)
            .then(response => response.json())
            .then(data => {
                const result = data.autoanalysis.map((row: ImageAnalysisData) => {
                    return {studyInstanceUid: row.studyInstanceUid,
                        seriesDescription: row.seriesDescription,
                        modality: row.modality,
                        acquisitionDate: row.acquisitionDate,
                        sex: row.sex,
                        size: row.size,
                        weight: row.weight,
                        initialNoRois: row.initialNoRois,
                        radiologicalFinding: row.radiologicalFinding,
                        statsNameUnits: row.statsNameUnits.map( (u: ImageUnitData) => u),
                        images: row.images,
                        ROI: row.ROI.map((roi: ImageROIData) => roi)
                    };
                });
                const imagePaths = this.getImagePath(result[0].acquisitionDate,result[0].modality, result[0].ROI[0].contourLabel);
                const subset = (this.props.studyId === "COMPARISON"? result.slice(2,4): result.slice(1,3));
                this.setState({
                    analysisData: result,
                    img: imagePaths[0],
                    imgROI: imagePaths[1],
                    selectedModOption: [{ value: result[0].modality, label: result[0].modality}],
                    selectedStatsOption: this.props.studyId !== "COMPARISON"?
                                { value: result[0].statsNameUnits[0].value, label: result[0].statsNameUnits[0].label}:
                                { value: result[0].statsNameUnits[6].value, label: result[0].statsNameUnits[6].label} ,
                    imgToolTip: {StudyInstanceUid: result[0].studyInstanceUid,
                        SeriesDescription:result[0].seriesDescription,
                        InitialNoRois: result[0].initialNoRois,
                        Modality: result[0].modality,
                        Acquisition: result[0].acquisitionDate,
                    },
                    plotData: this.getPlotData(result[0], result[2])
                });
        });
    }

    componentDidUpdate(prevProps: any, prevState: any) {
        const {oldImg, oldImgROI, oldImgToolTip} = this.state;
        if(oldImg !== prevState.img || oldImgROI !== prevState.imgROI || oldImgToolTip !== prevState.imgToolTip) {
            this.setState({oldImg: prevState.img, oldImgROI: prevState.imgROI,
                           oldImgToolTip: prevState.imgToolTip
            });
        }
    }

    handleModChange (selectedModOption: any) {
        this.setState({selectedModOption});
        //this.updateImageData();
    }

    handleChange (selectedStatsOption: any) {
        this.setState({selectedStatsOption});
        //this.updateImageData();
    }

    handleHover = (event: plotly.PlotMouseEvent) => {
        const imgKey = this.state.selectedStatsOption.value + "_" + event.points[0].x + "_" + event.points[0].data.name;
        const d = event.points[0].x;
        if (d) {
            const cols = event.points[0].data.name.split("-");
            const imgPaths = this.getImagePath(d.toString(), cols[0], cols[1]);
            const data = this.getAnalysisData(cols[0], d.toString());
            if (data) {
                this.setState({
                    img: imgPaths[0], imgROI: imgPaths[1],
                    imgToolTip: {StudyInstanceUid: data.studyInstanceUid,
                        SeriesDescription:data.seriesDescription,
                        InitialNoRois: data.initialNoRois,
                        Modality: data.modality,
                        Acquisition: data.acquisitionDate,
                    },
                });
            }
        }
    }

    handleUnHover = (event: plotly.PlotMouseEvent) => {
        const imgKey = this.state.selectedStatsOption.value + "_" + event.points[0].x + "_" + event.points[0].data.name;
    }

    handleClick = (event: plotly.PlotMouseEvent) => {
        const imgKey = this.state.selectedStatsOption.value + "_" + event.points[0].x + "_" + event.points[0].data.name;
    }

    public render() {

        const patientId = this.props.patientId;
        return (
            <div>
                <table className={styles["report-table"]}>
                    <tr>
                        <td>
                            Modality:  <Select multi
                            style={{width:  250}}
                            value={this.state.selectedModOption}
                            placeholder="Filter by Modality"
                            options={this.state.modOptions}
                            onChange={this.handleModChange.bind(this)}
                            clearable={false}
                            searchable={true}
                            name="modality"
                        />
                        </td>
                        <td>
                            Statistics: <Select
                            style={{width: 250}}
                            value={this.state.selectedStatsOption}
                            options={this.state.statOptions}
                            placeholder="Filter by Statistics"
                            onChange={this.handleChange.bind(this)}
                            clearable={false}
                            searchable={true}
                            name="statistics"
                        />
                        </td>
                        <td>
                            &nbsp;&nbsp;&nbsp;
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={this.props.studyId !== "COMPARISON"? 1:3}>
                            <Plot
                                  data={this.state.plotData}
                                  layout={this.state.layout}
                                  config={{displayModeBar: false}}
                                  onHover={this.handleHover}
                                  onUnhover={this.handleUnHover}
                                  onClick={this.handleClick}
                            />
                        </td>
                        { (this.props.studyId !== "COMPARISON") && (
                        <td colSpan={2}>
                            <span>
                                <DefaultTooltip
                                    mouseEnterDelay={0}
                                    placement="top"
                                    overlay={<span>Study Instance Uid:&nbsp;{this.state.imgToolTip.StudyInstanceUid}<br />
                                                    Series Description:&nbsp;{this.state.imgToolTip.SeriesDescription}<br />
                                                    InitialNoRois:&nbsp;{this.state.imgToolTip.InitialNoRois}<br />
                                                    Modality:&nbsp;{this.state.imgToolTip.Modality }<br />
                                                    Acqusition Date:&nbsp;{ this.state.imgToolTip.Acquisition}
                                             </span>}
                                >
                                <img src={window.location.origin + this.state.img} />
                                </DefaultTooltip>
                            </span>
                        </td>
                        )}
                    </tr>
                    <tr>
                        <td colSpan={3}>
                            <span>
                                <DefaultTooltip
                                    mouseEnterDelay={0}
                                    placement="top"
                                    overlay={<span>Study Instance Uid:&nbsp;{this.state.imgToolTip.StudyInstanceUid}<br />
                                                        Series Description:&nbsp;{this.state.imgToolTip.SeriesDescription}<br />
                                                        InitialNoRois:&nbsp;{this.state.imgToolTip.InitialNoRois}<br />
                                                        Modality:&nbsp;{this.state.imgToolTip.Modality }<br />
                                                        Acqusition Date:&nbsp;{ this.state.imgToolTip.Acquisition}
                                                 </span>}
                                >
                                <img src={window.location.origin + this.state.imgROI} />
                                </DefaultTooltip>
                            </span>
                        </td>
                    </tr>
                </table>
            </div>
        );
    }

    private getImagePath(acquisition:string, modality:string, contour: string): string[] {
        const root = "/cbioportal/images/" + this.props.studyId +"/";
        const patientId = this.props.patientId;
        let mipPrefix = "MIP_";
        let contourPrefix = "outline_";
        if (this.props.studyId === "COMPARISON") {
            mipPrefix = "";
            contourPrefix = "";
        }
        const dates = this.state.analysisData.map((d:ImageAnalysisData) => d.acquisitionDate).sort();
        if (acquisition === undefined) {
            acquisition = dates[0];
        }
        return (
            [root+patientId+"/"+acquisition+"_"+modality+"/"+mipPrefix+contour+'.png',
             root+patientId+"/"+acquisition+"_"+modality+"/"+contourPrefix+contour+'.png']
        );
    }

    private makePlotData3(x: string[], y: number[], contour: string, color: string, modality: string): {} {
        let type: string;
        if (this.state.selectedStatsOption) {
            type = this.state.selectedStatsOption.label;
        } else {
            type = 'Max[SUVbw]';
        }
        return ({
            x: x,
            y: y,
            type: 'lines+markers',
            marker: {
                color: color,
                symbol: 'circle',
                size: 16,
            },
            name: modality + "-" + contour,
            text: [type + ": " + y[0] +'<br />ContourLabel: '+contour + '<br />Baseline: '  + x[0] +'<br />Modality: '  + modality,
                   type + ": " + y[1] +'<br />ContourLabel: '+contour + ' <br />Followup: ' + x[1] + '<br />Modality: ' + modality,
                   type + ": " + y[2] +'<br />ContourLabel: '+contour + ' <br />Followup: ' + x[2] + '<br />Modality: ' + modality],
            hoverinfo: 'text',
        });
    }
    private makePlotData(x: string[], y: number[], contour: string, color: string, modality: string): {} {
        let type: string;
        if (this.state.selectedStatsOption) {
            type = this.state.selectedStatsOption.label;
        } else {
            if (this.props.studyId === 'COMPARISON') {
                type = 'RECIST Long[mm]';
            } else {
                type = 'Max[SUVbw]';
            }
            type = 'Max[SUVbw]';
        }
        return ({
                x: x,
                y: y,
                type: 'lines+markers',
                marker: {
                color: color,
                symbol: 'circle',
                size: 16,
            },
            name: modality + "-" + contour,
            text: [type  +': '+ y[0] +'<br />ContourLabel: '+contour+'<br />Baseline: '+x[0] +'<br />Modality: '+ modality,
                   type + ": " + y[1] +'<br />ContourLabel: '+ contour + ' <br />Followup: ' + x[1] + '<br />Modality: ' + modality],
            hoverinfo: 'text',
        });
    }

    private getStatsValue(r: ImageROIData): number {
            let val: number;
            switch (this.state.selectedStatsOption.value) {
                case 'max':
                    val = r.max;
                    break;
                case 'min':
                    val = r.min;
                    break;
                case 'volume':
                    val = r.volume
                    break;
                case 'activeMean':
                    val = r.activeMean
                    break;
                case 'matv':
                    val = r.matv;
                    break;
                case 'tla':
                    val = r.tla;
                    break;
                default:
                    val = r.activeMean;
                    break;
            }
            return val;
    }

    private getContourROI(l: string, d: ImageAnalysisData): ImageROIData|undefined {
        for (const r of d.ROI) {
            if (r.contourLabel === l) {
                return r;
            }
        }
    }

    private getAnalysisData(modality: string, acquisition: string): ImageAnalysisData |undefined {
        if (modality && acquisition) {
            return this.state.analysisData.find((d: ImageAnalysisData) =>
                (d.modality === modality && d.acquisitionDate === acquisition));
        }
    }

    private getPlotData3(d1:ImageAnalysisData, d2:ImageAnalysisData, d3:ImageAnalysisData): any | undefined {
        if (d1 && d2 && d3) {
            const contours = d1.ROI.map((r: ImageROIData) => r.contourLabel);
            return (
                contours.map((l:string) => {
                    const r1 = this.getContourROI(l, d1);
                    const y1 = (r1 !== undefined)? this.getStatsValue(r1): undefined;
                    const r2 = this.getContourROI(l, d2);
                    const y2 = (r2 !== undefined)? this.getStatsValue(r2): undefined;
                    const r3 = this.getContourROI(l, d3);
                    const y3 = (r3 !== undefined)? this.getStatsValue(r3): undefined;
                    const y = (y1 && y2 && y3)? [y1, y2, y3]: []
                    const x = [d1.acquisitionDate, d2.acquisitionDate, d3.acquisitionDate];
                    return this.makePlotData3(x, y, l, (r1 !== undefined)? r1.color.replace(" ","")
                                   :'Tomato', d1.modality);
                })
            );
        }
    }

    private getPlotData(d1:ImageAnalysisData, d2:ImageAnalysisData): any | undefined {
        if (d1 && d2) {
            const contours = d1.ROI.map((r: ImageROIData) => r.contourLabel);
            return (
                contours.map((l:string) => {
                    const r1 = this.getContourROI(l, d1);
                    const y1 = (r1 !== undefined)? this.getStatsValue(r1): undefined;
                    const r2 = this.getContourROI(l, d2);
                    const y2 = (r2 !== undefined)? this.getStatsValue(r2): undefined;
                    const y = (y1 && y2)? [y1, y2]: []
                    const x = [d1.acquisitionDate, d2.acquisitionDate];
                    return this.makePlotData(x, y, l, (r1 !== undefined)? r1.color.replace(" ","")
                                  :'Tomato', d1.modality);
                })
            );
        }
    }

    private getDataForPlots(data: any): any {
        let plotData: any;
        let plotData1: any;
        let plotData2: any;

        switch (data.length) {
            case 3:
                plotData = this.getPlotData3(data[0],data[1], data[2]);
                break;
            case 4:
                plotData1 = this.getPlotData(data[0], data[2]);
                plotData2 = this.getPlotData(data[1], data[3]);
                plotData =  [...plotData1, ...plotData2];
                break;
            case 5:
                plotData1 = this.getPlotData3(data[0], data[1], data[2]);
                plotData2 = this.getPlotData(data[3], data[4]);
                plotData =  [...plotData1, ...plotData2];
                break;
            default:
                if (this.props.studyId !== 'COMPARISON') {
                    plotData = this.getPlotData(data[0], data[2]);

                } else {
                    plotData = this.getPlotData3(data[0], data[1], data[2]);
                }
                break;
        }
        return plotData;
    }

    private updateImageData() {
        const data = this.state.analysisData;
        /*if (this.props.studyId === "COMPARISON") {
            if (this.state.selectedModOptions.value === 'CT') {
                data = this.state.analysisData.slice(0,3);
            } else {
                data = this.state.analysisData.slice(3,5);
            }
        }*/
        //const mods = this.state.selectedModOptions.map((opt:{value:string, label:string}) => opt.value);
        alert(this.state.selectedModOptions);
        /*if (mods.includes("PETMR") && !mods.includes("PETCT")) {
            data = this.state.analysisData.slice(0,2);
        } else if (mods.includes("PETCT") && !mods.includes("PETMR")) {
            data = this.state.analysisData.slice(1,3);
        } else {
            data = this.state.analysisData;
        }*/


        if (data && data.length > 0) {
            let plotData: any;
            let imgPaths: any;

            plotData = this.getDataForPlots(data);

            const contours = data[0].ROI.map((r: ImageROIData) => r.contourLabel);
            imgPaths = this.getImagePath(data[0].aquisitionDate, data[0].modality, contours[0]);
            if (imgPaths && plotData) {
                this.setState({
                    img: imgPaths[0],
                    imgROI: imgPaths[1],
                    plotData: plotData
                });
            }
        }
    }
}


