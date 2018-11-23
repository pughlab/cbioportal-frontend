import * as React from "react";
import styles from "../clinicalInformation/style/radiologyReport.module.scss";
import DefaultTooltip from "../../../shared/components/defaultTooltip/DefaultTooltip";
import Plot from "react-plotly.js";
import * as plotly from 'plotly.js';
import Select from 'react-select';
import {LAYOUT, ImageROIData, ImageAnalysisData, ImageUnitData, MODOPTIONS} from './RadioImageMeta';

export interface IPatientRadioImageProps {
    patientId: string;
}

export default class RadioImageReport extends React.Component<IPatientRadioImageProps,
                    {[propName: string]: any}> {

    constructor(props: IPatientRadioImageProps) {
        super(props);
        this.state = {
            analysisData: [],
            layout: LAYOUT,
            selectedModOption: [{ value: 'PETCT', label: 'PET/CT' }],
            selectedOption: { value: 'max', label: 'Max[SUVbw]' },
            selectedDateOption: {},
            img: '',
            imgROI: '',
            oldImg: '',
            oldImgROI: '',
            imgToolTip: {},
            statOptions: [],
            timePoints: [],
            plotData: []
        };
        this.handleModChange = this.handleModChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
    }

    componentDidMount() {
        const docFile = '/cbioportal/images/PSMA_Berlin/MIPs/'+
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
                const imagePaths = this.getImagePath(this.state.selectedDateOption.value, this.getModality(),
                                                     result[0].ROI[0].contourLabel);
                this.setState({
                    analysisData: result,
                    img: imagePaths[0],
                    imgROI: imagePaths[1],
                    statOptions: result[0].statsNameUnits,
                    timePoints: result.slice(1,3).map((d:ImageAnalysisData)=> {
                        return ({value:d.acquisitionDate, label:d.acquisitionDate});
                    }),
                    selectedDateOption: { value: result[0].acquisitionDate, label: result[0].acquisitionDate},
                    selectedModOption: [{ value: result[0].modality.replace("/",""), label: result[0].modality}],
                    modality: result[0].modality,
                    imgToolTip: {StudyInstanceUid: result[0].studyInstanceUid,
                        SeriesDescription:result[0].seriesDescription,
                        InitialNoRois: result[0].initialNoRois,
                        Modality: result[0].modality,
                        Acquisition: result[0].acquisitionDate
                    },
                    plotData: this.getPlotData(this.state.selectedOption.value, result[0], result[2])
                });
        });
    }

    handleModChange = (selectedModOption:any ) => {
        this.setState({ selectedModOption: selectedModOption });
        this.updatePlotImageData();
    }

    handleDateChange = (selectedDateOption:{value:string, label:string} ) => {
        this.setState({ selectedDateOption: selectedDateOption });
        this.updatePlotImageData();
    }

    handleChange = (selectedOption: {value:string, label:string}) => {
        this.setState({ selectedOption: selectedOption});
        this.updatePlotImageData();
    }

    handleHover = (event: plotly.PlotMouseEvent) => {
        const imgKey = this.state.selectedOption.value + "_" + event.points[0].x + "_" + event.points[0].data.name;
        const d = event.points[0].x;
        if (d) {
            const imgPath = this.getImagePath(d.toString(), this.getModality(), event.points[0].data.name);
            const oldImgPath = [this.state.img, this.state.imgROI];
            this.setState({img: imgPath[0], imgROI: imgPath[1],
                           oldImg: oldImgPath[0], oldImgROI: oldImgPath[1]});
        }
    }

    handleUnHover = (event: plotly.PlotMouseEvent) => {
        const imgKey = this.state.selectedOption.value + "_" + event.points[0].x + "_" + event.points[0].data.name;
        this.setState({img: this.state.oldImg, imgROI: this.state.oldImgROI});
    }

    handleClick = (event: plotly.PlotMouseEvent) => {
        const imgKey = this.state.selectedOption.value + "_" + event.points[0].x + "_" + event.points[0].data.name;
    }

    public render() {

        const patientId = this.props.patientId;
        return (
            <div>
                <table className={styles["report-table"]}>
                    <tr>
                        <td>
                            Modality:  <Select
                            clearable={false}
                            style={{width:  250}}
                            value={this.state.selectedModOption}
                            onChange={this.handleModChange}
                            options={MODOPTIONS}
                            multi={true}
                        />
                        </td>
                        <td>
                            Statistics: <Select
                            clearable={false}
                            style={{width: 250}}
                            value={this.state.selectedOption}
                            onChange={this.handleChange}
                            options={this.state.statOptions}
                        />
                        </td>
                        <td>
                            Acquisition Date: <Select
                            clearable={false}
                            style={{width: 150}}
                            value={this.state.selectedDateOption}
                            onChange={this.handleDateChange}
                            options={this.state.timePoints} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Plot
                                  data={this.state.plotData}
                                  layout={this.state.layout}
                                  config={{displayModeBar: false}}
                                  onHover={this.handleHover}
                                  onUnhover={this.handleUnHover}
                                  onClick={this.handleClick}
                            />
                        </td>
                        <td colSpan={2}>
                            <span>
                                <DefaultTooltip
                                    mouseEnterDelay={0}
                                    placement="top"
                                    overlay={<span>Study Instance Uid:&nbsp;{this.state.imgToolTip.StudyInstanceUid}<br />
                                                    Series Description:&nbsp;{this.state.imgToolTip.SeriesDescription}<br />
                                                    InitialNoRois:&nbsp;{this.state.imgToolTip.InitialNoRois}<br />
                                                    Modality:&nbsp;{this.getModality() }<br />
                                                    Acqusition Date:&nbsp;{this.state.selectedDateOption.value}
                                             </span>}
                                >
                                <img src={window.location.origin + this.state.img} />
                                </DefaultTooltip>
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={3}>
                            <img src={window.location.origin + this.state.imgROI} />
                        </td>
                    </tr>
                </table>
            </div>
        );
    }

    private getImagePath(acquisition:string, modality:string, contour: string): string[] {
        const root = '/cbioportal/images/PSMA_Berlin/MIPs/';
        const patientId = this.props.patientId;
        const pid = patientId.split("-")[2];
        const dates = this.state.timePoints.keys();
        let timePointStr = '';
        if (acquisition === dates[0]) {
            timePointStr = 'BL';
        } else {
            timePointStr = 'FU';
        }
        return (
            [root+patientId+"/pt"+pid+"_"+timePointStr+"_"+modality+"/MIP_"+contour+'.png',
             root+patientId+"/pt"+pid+"_"+timePointStr+"_"+modality+"/outline_"+contour+'.png']
        );
    }

    private makePlotData(x: string[], y: number[], contour: string, color: string,
                         stats: string, modality: string): {} {
        return ({
                x: x,
                y: y,
                type: 'lines+markers',
                marker: {
                color: color,
                symbol: 'circle',
                size: 16,
            },
            name: contour,
            text: [stats +': '+ y[0] +'<br />ContourLabel: '+contour+'<br />Baseline: '+x[0] +'<br />Modality: '+
                    modality, stats + ": " + y[1] +'<br />ContourLabel: '+ contour + ' <br />Followup: ' + x[1]
                   + '<br />Modality: ' + modality],
            hoverinfo: 'text',
        });
    }

    private getStatsValue(r: ImageROIData, type: string): number {
            let val: number;
            switch (type) {
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

    private getAnalysisData(modality: string): ImageAnalysisData {
        return this.state.analysisData.map((d: ImageAnalysisData) => {
            if (d.modality === modality) {
                return d;
            }
        });
    }

    private getPlotData(type:string, d1:ImageAnalysisData, d2:ImageAnalysisData): any  {
        if (d1 && d2) {
            const contours = d1.ROI.map((r: ImageROIData) => r.contourLabel);
            return (
                contours.map((l:string) => {
                    const r1 = this.getContourROI(l, d1);
                    const y1 = (r1 !== undefined)? this.getStatsValue(r1, type): undefined;
                    const r2 = this.getContourROI(l, d2);
                    const y2 = (r2 !== undefined)? this.getStatsValue(r2, type): undefined;
                    const y = (y1 && y2)? [y1, y2]: []
                    const x = [d1.acquisitionDate, d2.acquisitionDate];
                    return this.makePlotData(x, y, l, (r1 !== undefined)? r1.color.replace(" ","")
                                  :'Tomato', type, d1.modality);
                })
            );
        }
    }

    private getModality(): string {
        const option = this.state.selectModOption;
        if (option) {
            return option.map((opt: { value: string, label: string }) => opt.value)[0].replace("/","");
        } else {
            return 'PETCT';
        }
    }

    private updatePlotImageData() {
        const mods = this.state.selectedModOption.map((opt: {value:string, label:string}) => opt.value);
        let data: any;
        let imgPath: any;
        let plotData: any;
        if (mods.length === 2) {
            data = this.state.analysisData;
            const contours = data[0].ROI.map((r: ImageROIData) => r.contourLabel);
            imgPath = this.getImagePath(this.state.selectedDateOption.value, this.getModality(), contours[0]);
            const plotData1 = this.getPlotData(this.state.selectedOption.value, data[0], data[2]);
            const plotData2 = this.getPlotData(this.state.selectedOption.value, data[1], data[3]);
            plotData = [...plotData1, ...plotData2];

        } else {
            data = this.getAnalysisData(mods[0]);
            if (data !== undefined && data.length === 2) {
                const contours = data[0].ROI.map((r: ImageROIData) => r.contourLabel);
                imgPath = this.getImagePath(this.state.selectedDateOption.value, this.getModality(), contours[0]);
                plotData = this.getPlotData(this.state.selectedOption.value, data[0], data[1]);
            }
        }
        if (imgPath && plotData) {
            this.setState({
                img: imgPath[0],
                imgROI: imgPath[1],
                plotData: plotData
            });
        }
    }
}


