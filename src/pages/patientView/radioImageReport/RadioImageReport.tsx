import * as React from "react";
import styles from "../clinicalInformation/style/radiologyReport.module.scss";
import DefaultTooltip from "../../../shared/components/defaultTooltip/DefaultTooltip";
import Plot from "react-plotly.js";
import * as plotly from 'plotly.js';
import Select from 'react-select';
import {LAYOUT, ImageROIData, STATSOPTIONS, ImageAnalysisData, MODOPTIONS} from './RadioImageMeta';

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
            selectedModOption: { value: 'PETCT', label: 'PET/CT' },
            selectedOption: { value: 'max', label: 'Max[SUVbw]' },
            selectedDateOption: {},
            img: '',
            imgROI: '',
            imgToolTip: {},
            timePoints: [],
            plotData: []
        };
    }

    componentDidMount() {
        const docFile = '/cbioportal/images/PSMA_Berlin/MIPs/DCFPYL-1-21-NWI/DCFPYL-1-21-NWI.json';
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
                        images: row.images,
                        ROI: row.ROI.map((roi: ImageROIData) => roi)
                    };
                });

                this.setState({
                    analysisData: result,
                    img: result[0].images[8],
                    imgROI: result[0].images[0],
                    timePoints: result.slice(1,3).map((d:ImageAnalysisData)=> {
                        return ({value:d.acquisitionDate, label:d.acquisitionDate});
                    }),
                    selectedDateOption: { value: result[0].acquisitionDate, label: result[0].acquisitionDate},
                    imgToolTip: {StudyInstanceUid: result[0].studyInstanceUid,
                        SeriesDescription:result[0].seriesDescription,
                        InitialNoRois: result[0].initialNoRois},
                    plotData: this.getPlotData("max", result[0], result[2])
                });
        });
    }

    handleModChange = (selectedModOption:{value:string, label:string} ) => {
        //alert(this.state.analysisData[2].ROI[0].contourLabel);
        this.setState({ selectedModOption: selectedModOption});
    }

    handleDateChange = (selectedDateOption:{value:string, label:string} ) => {
        this.setState({ selectedDateOption: selectedDateOption });
    }

    handleChange = (selectedOption: {value:string, label:string}) => {
        this.setState({ selectedOption: selectedOption,
                        img: this.state.analysisData[2].images[8],
                        imgROI: this.state.analysisData[2].images[0]});
        const data = this.state.analysisData;
        switch (selectedOption.value) {
            case 'min':
                this.setState({plotData: this.getPlotData("min", data[0], data[2])});
                break;
            case 'max':
                this.setState({plotData: this.getPlotData("min", data[0], data[2])});
                break;
            case 'volume':
                this.setState({plotData: this.getPlotData("min", data[0], data[2])});
                break;
            case 'activeMean':
                this.setState({plotData: this.getPlotData("min", data[0], data[2])});
                break;
            case 'matv':
                this.setState({plotData: this.getPlotData("min", data[0], data[2])});
                break;
            case 'tla':
                this.setState({plotData: this.getPlotData("min", data[0], data[2])});
                break;
            default:
                this.setState({plotData: this.getPlotData("min", data[0], data[2])});
                break;
        }
    }

    handleHover = (event: plotly.PlotMouseEvent) => {
        const imgKey = this.state.selectedOption.value + "_" + event.points[0].x + "_" + event.points[0].data.name;
        this.setState({img: this.state.analysisData[1].images[8]});
        this.setState({imgROI: this.state.analysisData[1].images[0]});
    }

    handleUnHover = (event: plotly.PlotMouseEvent) => {
        const imgKey = this.state.selectedOption.value + "_" + event.points[0].x + "_" + event.points[0].data.name;
        this.setState({img: this.state.analysisData[0].images[8]})
        this.setState({imgROI: this.state.analysisData[0].images[0]});
    }

    handleClick = (event: plotly.PlotMouseEvent) => {
        const imgKey = this.state.selectedOption.value + "_" + event.points[0].x + "_" + event.points[0].data.name;
        //event.points[0].data.marker.color = "#9624fa"
        //event.points[0].data.marker.symbol = "diamond-open"
        this.setState({img: this.state.analysisData[1].images[8]});
        this.setState({imgROI: this.state.analysisData[1].images[0]});
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
                            style={{width:  150}}
                            value={this.state.selectedModOption}
                            onChange={this.handleModChange}
                            options={MODOPTIONS}
                        />
                        </td>
                        <td>
                            Statistics: <Select
                            clearable={false}
                            style={{width: 150}}
                            value={this.state.selectedOption}
                            onChange={this.handleChange}
                            options={STATSOPTIONS}
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
                        <td style={{align:"right"}}>
                            <span>
                                <DefaultTooltip
                                    mouseEnterDelay={0}
                                    placement="top"
                                    overlay={<span>Study Instance Uid:&nbsp;{this.state.imgToolTip.StudyInstanceUid}<br />
                                                    Series Description:&nbsp;{this.state.imgToolTip.SeriesDescription}<br />
                                                    InitialNoRois:&nbsp;{this.state.imgToolTip.InitialNoRois}<br />
                                                    Modality:&nbsp;{this.state.selectedModOption.label}<br />
                                                    Acqusition Date:&nbsp;{this.state.selectedDateOption.value}
                                             </span>}
                                >
                                <i className="fa fa-info-circle fa-2x "></i>
                                </DefaultTooltip>
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
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
                            <img src={window.location.origin + this.state.img} />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={4}>
                            <img src={window.location.origin + this.state.imgROI} />
                        </td>
                    </tr>
                </table>
            </div>
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
                    modality, stats + y[1] +'<br />ContourLabel: '+ contour + ' <br />Followup: ' + x[1]
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

    private getColor(l:string): string {
        let color = '';
        switch(l) {
            case 'Liver':
                color = "Tomato";
                break;
            case 'LV':
                color = "DodgerBlue";
                break;
            case 'Parotid':
                color = "MediumSeaGreen";
                break;
            case 'LTgroin1':
                color = "Maroon";
                break;
            case 'LTgroin2':
                color = "Purple";
                break;
            case 'LTgroin3':
                color = "Fuchsia";
                break;
            case 'LTiliacsup':
                color = "Olive";
                break;
            default:
                color = "Orange";
                break;
        }
        return color;
    }

    private getPlotData(type:string, d1:ImageAnalysisData, d2:ImageAnalysisData): any  {
        if (d1 && d2) {
            const contours = d1.ROI.map((r:ImageROIData) => r.contourLabel);
            return (
                contours.map((l:string) => {
                    const r1 = this.getContourROI(l, d1);
                    const y1 = (r1 !== undefined)? this.getStatsValue(r1, type): undefined;
                    const r2 = this.getContourROI(l, d2);
                    const y2 = (r2 !== undefined)? this.getStatsValue(r2, type): undefined;
                    const y = (y1 && y2)? [y1, y2]: []
                    const x = [d1.acquisitionDate, d2.acquisitionDate];
                    return this.makePlotData(x, y, l, this.getColor(l), type, d1.modality);
                })
            );
        }
    }
}


