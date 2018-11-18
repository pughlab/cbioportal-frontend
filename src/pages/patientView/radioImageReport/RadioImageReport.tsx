import * as React from "react";
import styles from "../clinicalInformation/style/radiologyReport.module.scss";
import DefaultTooltip from "../../../shared/components/defaultTooltip/DefaultTooltip";
import Plot from "react-plotly.js";
import * as plotly from 'plotly.js';
import Select from 'react-select';

export interface IPatientRadioImageProps {
    patientId: string;
}

export type ImageAnalysisData = {
    studyInstanceUid: string,
    seriesDescription: string,
    modality: string,
    acquisitionDate: string,
    sex: string,
    size: number,
    weight: number,
    initialNoRois: number,
    radiologicalFinding: any,
    images: any,
    ROI: ImageROIData[],
    [propName: string]: any
};

export type ImageROIData = {
    contourLabel: string,
    max: number,
    min: number,
    volume: number,
    activeMean: number,
    matv: number,
    tla: number,
    [propName: string]: any
};

const modOptions = [
    { value: 'PETCT', label: 'PET/CT' },
    { value: 'PETMR', label: 'PET/MR' },
];

const statsOptions = [
    { value: 'max', label: 'Max[SUVbw]' },
    { value: 'mean', label: 'Mean[SUVbw]' },
    { value: 'min', label: 'Min[SUVbw]' },
    { value: 'volume', label: 'Volume[ml]'},
    { value: 'activeMean', label: 'Standard Deviation[SUVbw]'},
    { value: 'matv', label:'SUV Peak[SUVbw]'},
    { value: 'tla', label:'RECIST Long[cm]'}
];

const layout = {
    plotBackground: '#f3f6fa',
    margin: {t:30, r: 0, l: 40, b: 30, pad: 5},
    title:'Standard Uptake Value (as Calculated using Body Weight)',
    titlefont: {
        "size": 12,
    },
    hovermode: 'closest',
    autosize: false,
    width: 500,
    height: 360,
};

const docFile = '/cbioportal/images/PSMA_Berlin/MIPs/DCFPYL-1-21-NWI/DCFPYL-1-21-NWI.json';

export default class RadioImageReport extends React.Component<IPatientRadioImageProps,
                    {[propName: string]: any}> {

    constructor(props: IPatientRadioImageProps) {
        super(props);
        this.state = {
            analysisData: [],
            layout: layout,
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
                    timePoints: [{value:result[0].acquisitionDate, label:result[0].acquisitionDate},
                                {value:result[2].acquisitionDate, label:result[2].acquisitionDate}],
                    selectedDateOption: { value: result[0].acquisitionDate, label: result[0].acquisitionDate},
                    imgToolTip: {StudyInstanceUid: result[0].studyInstanceUid,
                        SeriesDescription:result[0].seriesDescription,
                        InitialNoRois: result[0].initialNoRois},
                    plotData: this.getPlotData("max")
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
        switch (selectedOption.value) {
            case 'min':
                this.setState({plotData: this.getPlotData("min")});
                break;
            case 'max':
                this.setState({plotData: this.getPlotData("max")});
                break;
            case 'volume':
                this.setState({plotData: this.getPlotData("volume")});
                break;
            case 'activeMean':
                this.setState({plotData: this.getPlotData("mean")});
                break;
            case 'matv':
                this.setState({plotData: this.getPlotData("matv")});
                break;
            case 'tla':
                this.setState({plotData: this.getPlotData("tla")});
                break;
            default:
                this.setState({plotData: this.getPlotData("max")});
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
                            options={modOptions}
                        />
                        </td>
                        <td>
                            Statistics: <Select
                            clearable={false}
                            style={{width: 150}}
                            value={this.state.selectedOption}
                            onChange={this.handleChange}
                            options={statsOptions}
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

    private getPlotData(type:string) {
        return (
            [{
                x: ['2017-05-26','2017-10-20'],
                y: [11.3985738754,12.00828552],
                type: 'lines+markers',
                marker: {
                    color: 'Tomato',
                    symbol: 'circle',
                    size: 16,
                },
                name: 'Liver',
                text: ['Max: 11.3985738754<br />ContourLabel: Liver<br />Baseline: 2017-05-26<br />Modality:PET/MR',
                    'Max: 12.00828552<br />ContourLabel: Liver<br />Followup: 2017-10-20<br />Modality:PET/MR'],
                hoverinfo: 'text',
            },
                {
                    x: ['2017-05-26','2017-10-20'],
                    y: [1.2762573957,1.351804495],
                    type: 'lines+markers',
                    marker: {
                        color: 'DodgerBlue',
                        symbol: 'circle',
                        size: 16,
                    },
                    name: 'LV',
                    text: ['Max: 1.2762573957<br />ContourLabel: LV<br />Baseline: 2017-05-26<br />Modality:PET/MR',
                        'Max: 1.351804495<br />ContourLabel: LV<br />Followup: 2017-10-20<br />Modality:PET/MR'],
                    hoverinfo: 'text'
                },
                {
                    x: ['2017-05-26','2017-10-20'],
                    y: [22.47808266,23.832901],
                    type: 'lines+markers',
                    marker: {
                        color: 'MediumSeaGreen',
                        symbol: 'circle',
                        size: 16,
                    },
                    name: 'Parotid',
                    text: ['Max: 22.47808266<br />ContourLabel: Parotid<br />Baseline: 2017-05-26<br />Modality:PET/MR',
                        'Max: 23.832901<br />ContourLabel: Parotid<br />Followup: 2017-10-20<br />Modality:PET/MR'],
                    hoverinfo: 'text',
                }
            ]
        );
    }
}


