import * as React from "react";
import styles from "../clinicalInformation/style/radiologyReport.module.scss";
import Plot from "react-plotly.js";
import * as plotly from 'plotly.js';
//import PlotlyChart from './PlotlyChart';
import Select from 'react-select';

export interface IClinicalInformationPatientTableProps {
    patientId: string;
}

const modOptions = [
    { value: 'PETCT', label: 'PET/CT' },
    { value: 'PETMR', label: 'PET/MR' }
];

const statsOptions = [
    { value: 'max', label: 'Maximum' },
    { value: 'mean', label: 'Mean' },
    { value: 'min', label: 'Minimum' },
    { value: 'volume', label: 'Volume' }
];

const plotMinJSON = {
    data: [{
        x: ['2017-05-26','2017-10-20'],
        y: [2.728000164,1.377518177],
        type: 'lines+markers',
        marker: {
            color: 'Tomato',
            symbol: 'circle',
            size: 16,
        },
        name: 'Liver',
        text: ['Min: 11.3985738754<br />ContourLabel: Liver<br />Baseline: 2017-05-26<br />Modality:PET/MR',
            'Min: 12.00828552<br />ContourLabel: Liver<br />Followup: 2017-10-20<br />Modality:PET/MR'],
        hoverinfo: 'text',
    },
        {
            x: ['2017-05-26','2017-10-20'],
            y: [0.697953224,0.716309488],
            type: 'lines+markers',
            marker: {
                color: 'DodgerBlue',
                symbol: 'circle',
                size: 16,
            },
            name: 'LV',
            text: ['Min: 1.2762573957<br />ContourLabel: LV<br />Baseline: 2017-05-26<br />Modality:PET/MR',
                'Min: 1.351804495<br />ContourLabel: LV<br />Followup: 2017-10-20<br />Modality:PET/MR'],
            hoverinfo: 'text'
        },
        {
            x: ['2017-05-26','2017-10-20'],
            y: [5.292479992,4.521933079],
            type: 'lines+markers',
            marker: {
                color: 'MediumSeaGreen',
                symbol: 'circle',
                size: 16,
            },
            name: 'Parotid',
            text: ['Min: 22.47808266<br />ContourLabel: Parotid<br />Baseline: 2017-05-26<br />Modality:PET/MR',
                'Min: 23.832901<br />ContourLabel: Parotid<br />Followup: 2017-10-20<br />Modality:PET/MR'],
            hoverinfo: 'text',
        }],
    layout: {
        plotBackground: '#f3f6fa',
        margin: {t:30, r: 0, l: 30, b: 30, pad: 5},
        title:'Standard Uptake Value (as Calculated using Body Weight)',
        titlefont: {
            "size": 12,
        },
        hovermode: 'closest',
        autosize: false,
        width: 500,
        height: 360,
    }
};

const plotJSON = {
    data: [{
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
        }],
    layout: {
        plotBackground: '#f3f6fa',
        margin: {t:30, r: 0, l: 30, b: 30, pad: 5},
        title:'Standard Uptake Value (as Calculated using Body Weight)',
        titlefont: {
            "size": 12,
        },
        hovermode: 'closest',
        autosize: false,
        width: 500,
        height: 360,
    }
};

const plotMeanJSON = {
    data: [{
        x: ['2017-05-26','2017-10-20'],
        y: [7.884856224,9.267568588],
        type: 'lines+markers',
        marker: {
            color: 'Tomato',
            symbol: 'circle',
            size: 16,
        },
        name: 'Liver',
        text: ['Mean: 11.3985738754<br />ContourLabel: Liver<br />Baseline: 2017-05-26<br />Modality:PET/MR',
            'Mean: 12.00828552<br />ContourLabel: Liver<br />Followup: 2017-10-20<br />Modality:PET/MR'],
        hoverinfo: 'text',
    },
        {
            x: ['2017-05-26','2017-10-20'],
            y: [0.881192982,1.069058299],
            type: 'lines+markers',
            marker: {
                color: 'DodgerBlue',
                symbol: 'circle',
                size: 16,
            },
            name: 'LV',
            text: ['Mean: 1.2762573957<br />ContourLabel: LV<br />Baseline: 2017-05-26<br />Modality:PET/MR',
                'Mean: 1.351804495<br />ContourLabel: LV<br />Followup: 2017-10-20<br />Modality:PET/MR'],
            hoverinfo: 'text'
        },
        {
            x: ['2017-05-26','2017-10-20'],
            y: [17.15966415,17.97129822],
            type: 'lines+markers',
            marker: {
                color: 'MediumSeaGreen',
                symbol: 'circle',
                size: 16,
            },
            name: 'Parotid',
            text: ['Mean: 22.47808266<br />ContourLabel: Parotid<br />Baseline: 2017-05-26<br />Modality:PET/MR',
                'Mean: 23.832901<br />ContourLabel: Parotid<br />Followup: 2017-10-20<br />Modality:PET/MR'],
            hoverinfo: 'text',
        }],
    layout: {
        plotBackground: '#f3f6fa',
        margin: {t:30, r: 0, l: 30, b: 30, pad: 5},
        title:'Standard Uptake Value (as Calculated using Body Weight)',
        titlefont: {
            "size": 12,
        },
        hovermode: 'closest',
        autosize: false,
        width: 500,
        height: 360,
    }
};

const plotVolJSON = {
    data: [{
        x: ['2017-05-26','2017-10-20'],
        y: [1811.666504,2239.783936],
        type: 'lines+markers',
        marker: {
            color: 'Tomato',
            symbol: 'circle',
            size: 16,
        },
        name: 'Liver',
        text: ['Volume: 11.3985738754<br />ContourLabel: Liver<br />Baseline: 2017-05-26<br />Modality:PET/MR',
            'Volume: 12.00828552<br />ContourLabel: Liver<br />Followup: 2017-10-20<br />Modality:PET/MR'],
        hoverinfo: 'text',
    },
        {
            x: ['2017-05-26','2017-10-20'],
            y: [4.185670376,4.185117722],
            type: 'lines+markers',
            marker: {
                color: 'DodgerBlue',
                symbol: 'circle',
                size: 16,
            },
            name: 'LV',
            text: ['Volume: 1.2762573957<br />ContourLabel: LV<br />Baseline: 2017-05-26<br />Modality:PET/MR',
                'Volume: 1.351804495<br />ContourLabel: LV<br />Followup: 2017-10-20<br />Modality:PET/MR'],
            hoverinfo: 'text'
        },
        {
            x: ['2017-05-26','2017-10-20'],
            y: [82.93429565,87.17245483],
            type: 'lines+markers',
            marker: {
                color: 'MediumSeaGreen',
                symbol: 'circle',
                size: 16,
            },
            name: 'Parotid',
            text: ['Volume: 22.47808266<br />ContourLabel: Parotid<br />Baseline: 2017-05-26<br />Modality:PET/MR',
                'Volume: 23.832901<br />ContourLabel: Parotid<br />Followup: 2017-10-20<br />Modality:PET/MR'],
            hoverinfo: 'text',
        }],
    layout: {
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
    }
};

const imgs = [  '/cbioportal/images/PSMA_Berlin/MIPs/DCFPYL-1-01-DES/DCFPYL-1-01-DES_20170526_PETCTMIP.png',
                '/cbioportal/images/PSMA_Berlin/MIPs/DCFPYL-1-01-DES/DCFPYL-1-01-DES_20170526_PETMRMIP.png',
                '/cbioportal/images/PSMA_Berlin/MIPs/DCFPYL-1-01-DES/DCFPYL-1-01-DES_20171020_PETMRMIP.png'];

const imgROIs = [
    '/cbioportal/images/PSMA_Berlin/MIPs/DCFPYL-1-01-DES/pt1_BL_PETCT/outline_liver.png',
    '/cbioportal/images/PSMA_Berlin/MIPs/DCFPYL-1-01-DES/pt1_BL_PETCT/outline_lv.png',
    '/cbioportal/images/PSMA_Berlin/MIPs/DCFPYL-1-01-DES/pt1_BL_PETCT/outline_parotid.png',
    '/cbioportal/images/PSMA_Berlin/MIPs/DCFPYL-1-01-DES/pt1_BL_PETMR/outline_liver.png',
    '/cbioportal/images/PSMA_Berlin/MIPs/DCFPYL-1-01-DES/pt1_BL_PETMR/outline_lv.png',
    '/cbioportal/images/PSMA_Berlin/MIPs/DCFPYL-1-01-DES/pt1_BL_PETMR/outline_parotid.png',
    '/cbioportal/images/PSMA_Berlin/MIPs/DCFPYL-1-01-DES/pt1_FU_PETMR/outline_liver.png',
    '/cbioportal/images/PSMA_Berlin/MIPs/DCFPYL-1-01-DES/pt1_FU_PETMR/outline_lv.png',
    '/cbioportal/images/PSMA_Berlin/MIPs/DCFPYL-1-01-DES/pt1_FU_PETMR/outline_parotid.png'];

export default class RadioImageReport extends React.Component<IClinicalInformationPatientTableProps,
            {json: any, img: any, imgROI: any, selectedModOption: any, selectedOption: any}> {
    chartTarget:HTMLCanvasElement;
    constructor(props: IClinicalInformationPatientTableProps) {
        super(props);

        this.state = {
            json: plotJSON,
            img: '/cbioportal/images/PSMA_Berlin/MIPs/DCFPYL-1-01-DES/DCFPYL-1-01-DES_20170526_PETMRMIP.png',
            imgROI: '/cbioportal/images/PSMA_Berlin/MIPs/DCFPYL-1-01-DES/pt1_BL_PETMR/outline_liver.png',
            selectedModOption: { value: 'PETMR', label: 'PET/MR' },
            selectedOption: { value: 'max', label: 'Maximum' },
        };
    }

    handleModChange = (selectedModOption:{value:string, label:string} ) => {
        this.setState({ selectedModOption: selectedModOption });
    }

    handleChange = (selectedOption: {value:string, label:string}) => {
        this.setState({ selectedOption: selectedOption });
        this.setState({img: '/cbioportal/images/PSMA_Berlin/MIPs/DCFPYL-1-01-DES/DCFPYL-1-01-DES_20171020_PETMRMIP.png'});
        this.setState({imgROI: '/cbioportal/images/PSMA_Berlin/MIPs/DCFPYL-1-01-DES/pt1_FU_PETMR/outline_liver.png'});
        switch (selectedOption.value) {
            case 'min':
                this.setState({json: plotMinJSON});
                break;
            case 'max':
                this.setState({json: plotJSON});
                break;
            case 'mean':
                this.setState({json: plotMeanJSON});
                break;
            case 'volume':
                this.setState({json: plotVolJSON});
                break;
            default:
                this.setState({json: plotJSON});
                break;
        }
    }


    handleHover = (event: plotly.PlotMouseEvent) => {
        const imgKey = this.state.selectedOption.value + "_" + event.points[0].x + "_" + event.points[0].data.name;
        /*const timePoint = event.points[0].x
        if (timePoint && timePoint !== "") {
            const imgPath = '/cbioportal/images/PSMA_Berlin/MIPs/DCFPYL-1-01-DES/DCFPYL-1-01-DES_' +
                            timePoint.toString().replace("-","") + "_"
                            + this.state.selectedOption.value + "MIP.png";
            this.setState({img: imgPath});
            const imgPrefix = (timePoint === '2017-10-20')? 'FU': 'BL';
            const imgROIPath = '/cbioportal/images/PSMA_Berlin/MIPs/DCFPYL-1-01-DES/pt1_' + imgPrefix +
                                this.state.selectedOption.value + 'outline_' + event.points[0].data.name + '.png';
            this.setState({imgROI:imgROIPath});
        }*/
        this.setState({img: '/cbioportal/images/PSMA_Berlin/MIPs/DCFPYL-1-01-DES/DCFPYL-1-01-DES_20171020_PETMRMIP.png'});
        this.setState({imgROI: '/cbioportal/images/PSMA_Berlin/MIPs/DCFPYL-1-01-DES/pt1_FU_PETMR/outline_liver.png'});
    }

    handleUnHover = (event: plotly.PlotMouseEvent) => {
        const imgKey = this.state.selectedOption.value + "_" + event.points[0].x + "_" + event.points[0].data.name;
        this.setState({img: '/cbioportal/images/PSMA_Berlin/MIPs/DCFPYL-1-01-DES/DCFPYL-1-01-DES_20170526_PETMRMIP.png'})
        this.setState({imgROI: '/cbioportal/images/PSMA_Berlin/MIPs/DCFPYL-1-01-DES/pt1_BL_PETMR/outline_liver.png'});
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
                            Measurement: <Select
                            clearable={false}
                            style={{width: 150}}
                            value={this.state.selectedOption}
                            onChange={this.handleChange}
                            options={statsOptions}
                        />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Plot
                                  data={this.state.json.data}
                                  layout={this.state.json.layout}
                                  config={{displayModeBar: false}}
                                  onHover={this.handleHover}
                                  onUnhover={this.handleUnHover}
                            />
                        </td>
                        <td>
                            <img src={window.location.origin + this.state.img} />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            <img src={window.location.origin + this.state.imgROI} />
                        </td>
                    </tr>
                </table>
            </div>
        );
    }

}


