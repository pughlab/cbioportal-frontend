import * as React from "react";
import styles from "../clinicalInformation/style/radiologyReport.module.scss";
import Plot from "react-plotly.js";
import Select from 'react-select';
import {MutationCountBy} from "../../resultsView/plots/PlotsTab";

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

export default class RadioImageReport extends React.Component<IClinicalInformationPatientTableProps,
            {json: any, img: any, imgROI: any, selectedModOption: any, selectedOption: any}> {
    //chartTarget:HTMLCanvasElement;
    constructor(props: IClinicalInformationPatientTableProps) {
        super(props);

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
                    text: ['Max: 11.3985738754<br />ContourLabel: Liver<br />Baseline: 2017-05-26',
                            'Max: 12.00828552<br />ContourLabel: Liver<br />Followup: 2017-10-20'],
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
                    text: ['Max: 1.2762573957<br />ContourLabel: LV<br />Baseline: 2017-05-26',
                        'Max: 1.351804495<br />ContourLabel: LV<br />Followup: 2017-10-20'],
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
                    text: ['Max: 22.47808266<br />ContourLabel: Parotid<br />Baseline: 2017-05-26',
                        'Max: 23.832901<br />ContourLabel: Parotid<br />Followup: 2017-10-20'],
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

        const imgs = [
            '/cbioportal/images/PSMA_Berlin/MIPs/DCFPYL-1-01-DES/DCFPYL-1-01-DES_20170526_PETCTMIP.png',
            '/cbioportal/images/PSMA_Berlin/MIPs/DCFPYL-1-01-DES/DCFPYL-1-01-DES_20170526_PETMRMIP.png',
            '/cbioportal/images/PSMA_Berlin/MIPs/DCFPYL-1-01-DES/DCFPYL-1-01-DES_20171020_PETMRMIP.png'
        ]
        const imgROIs = [
            '/cbioportal/images/PSMA_Berlin/MIPs/DCFPYL-1-01-DES/pt1_BL_PETCT/outline_liver.png',
            '/cbioportal/images/PSMA_Berlin/MIPs/DCFPYL-1-01-DES/pt1_BL_PETCT/outline_lv.png',
            '/cbioportal/images/PSMA_Berlin/MIPs/DCFPYL-1-01-DES/pt1_BL_PETCT/outline_parotid.png',
            '/cbioportal/images/PSMA_Berlin/MIPs/DCFPYL-1-01-DES/pt1_BL_PETMR/outline_liver.png',
            '/cbioportal/images/PSMA_Berlin/MIPs/DCFPYL-1-01-DES/pt1_BL_PETMR/outline_lv.png',
            '/cbioportal/images/PSMA_Berlin/MIPs/DCFPYL-1-01-DES/pt1_BL_PETMR/outline_parotid.png',
            '/cbioportal/images/PSMA_Berlin/MIPs/DCFPYL-1-01-DES/pt1_FU_PETMR/outline_liver.png',
            '/cbioportal/images/PSMA_Berlin/MIPs/DCFPYL-1-01-DES/pt1_FU_PETMR/outline_lv.png',
            '/cbioportal/images/PSMA_Berlin/MIPs/DCFPYL-1-01-DES/pt1_FU_PETMR/outline_parotid.png',
        ]
        this.state = {
            json: plotJSON,
            img: imgs,
            imgROI: imgROIs,
            selectedModOption: { value: 'PETMR', label: 'PET/MR' },
            selectedOption: { value: 'max', label: 'Maximum' },
        };
    }

    handleModChange = (selectedModOption:{value:string, label:string} ) => {
        this.setState({ selectedModOption: selectedModOption });
    }

    handleChange = (selectedOption: {value:string, label:string}) => {
        this.setState({ selectedOption: selectedOption });
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
                            Statistic: <Select
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
                            <Plot data={this.state.json.data}
                                  layout={this.state.json.layout}
                                  config={{displayModeBar: false}}
                            />
                        </td>
                        <td>
                            { this.state.selectedModOption &&
                                this.state.selectedModOption.label === 'PET/CT'?
                                <img src={window.location.origin + this.state.img[0]} />
                                : <img src={window.location.origin + this.state.img[1]} />
                            }
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            { this.state.selectedModOption &&
                                this.state.selectedModOption.label === 'PET/CT' &&
                                this.state.selectedOption.label === 'Maximum' ?
                                <img src={window.location.origin + this.state.imgROI[0]} />
                                : <img src={window.location.origin + this.state.imgROI[3]} />
                            }
                        </td>
                    </tr>
                </table>
            </div>
        );
    }

}


