import * as React from "react";
import {ClinicalData} from "../../../shared/api/generated/CBioPortalAPI";
import LazyMobXTable from "shared/components/lazyMobXTable/LazyMobXTable";
import Chart from 'chart.js';
import { ChartTooltipItem } from 'chart.js';
import styles from "./style/radiologyReport.module.scss";
import {SHOW_ALL_PAGE_SIZE} from "../../../shared/components/paginationControls/PaginationControls";

export interface IClinicalInformationPatientTableProps {
    data: ClinicalData[];
    showTitleBar?: boolean;
    cssClass?:string;
    showFilter?:boolean;
    showCopyDownload?:boolean;
}

class PatientTable extends LazyMobXTable<IPatientRow> {}

interface IPatientRow {
    attribute: string;
    value: string;
};

export default class RadiologyReport extends React.Component<IClinicalInformationPatientTableProps, {}> {
    chartTarget:HTMLCanvasElement;

    public render() {

        const tableData = this.props.data && this.props.data.map((el: ClinicalData) => ({
            attribute: el.clinicalAttribute.displayName || '',
            value: el.value
        }));

        return (
            <div>
                <div>
                    <span>Sex: M Size: 1.88 Weight: 108.0 BirthDate: Confidential</span>
                </div>
                <div>
                <table className={styles["report-table"]}>
                    <tr>
                        <td>
                            <table className={styles["report-table"]}>
                                <tr>
                                    <td>Modality</td><td>PET/MR</td>
                                </tr>
                                <tr>
                                    <td>Acquisition Date</td><td>2017-05-26</td>
                                </tr>
                                <tr>
                                    <td>Radiopharmaceutical Start Time</td><td>11:05:00</td>
                                </tr>
                                <tr>
                                    <td>Acquisition Time</td><td>12:58:53</td>
                                </tr>
                                <tr>
                                    <td>radiopharmaceutical</td><td>DCFPyL</td>
                                </tr>
                                <tr>
                                    <td>Series Description</td><td>*MRAC_PET_AC Images</td>
                                </tr>
                                <tr>
                                    <td>studyInstanceUid</td><td>1.3.6.1.4.1.12201.1077.1.228576162245353281593824550634323772191</td>
                                </tr>
                                <tr>
                                    <td>Radiological Finding</td>
                                    <td>
                                        <table>
                                            <tr>
                                                <th>lesionNumber</th>
                                                <th>lesionType</th>
                                                <th>location</th>
                                            </tr>
                                            <tr>
                                                <td>1.0</td>
                                                <td>Prostate</td>
                                                <td>Prostate</td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Initail/Net values</td>
                                    <td>
                                        <table>
                                            <tr>
                                                <td>initialNoRois</td><td>7.0</td>
                                            </tr>
                                            <tr>
                                                <td>initialRoiVolume</td><td>80.84</td>
                                            </tr>
                                            <tr>
                                                <td>netMatv</td><td>31.47</td>
                                            </tr>
                                            <tr>
                                                <td>netTla</td><td>716.67</td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Automated Analysis Finding</td>
                                    <td>
                                        <table className={styles["report-table"]}>
                                            <tr>
                                                <th>contourLabel</th>
                                                <th>max</th>
                                                <th>min</th>
                                                <th>volume</th>
                                                <th>activeMin</th>
                                                <th>activeMean</th>
                                                <th>matv</th>
                                                <th>tla</th>
                                            </tr>
                                            <tr>
                                                <td>ROI 1</td>
                                                <td>108.35</td>
                                                <td>2.81</td>
                                                <td>51.38</td>
                                                <td>43.43</td>
                                                <td>64.97</td>
                                                <td>9.37</td>
                                                <td>608.82</td>
                                            </tr>
                                            <tr>
                                                <td>ROI 2</td>
                                                <td>4.73</td>
                                                <td>2.8</td>
                                                <td>14.04</td>
                                                <td>2.8</td>
                                                <td>3.26</td>
                                                <td>14.04</td>
                                                <td>5.76</td>
                                            </tr>
                                            <tr>
                                                <td>ROI 3</td>
                                                <td>13.77</td>
                                                <td>2.8</td>
                                                <td>3.89</td>
                                                <td>5.79</td>
                                                <td>9.05</td>
                                                <td>1.73</td>
                                                <td>15.68</td>
                                            </tr>
                                            <tr>
                                                <td>ROI 4</td>
                                                <td>7.1</td>
                                                <td>2.86</td>
                                                <td>2.23</td>
                                                <td>2.86</td>
                                                <td>4.23</td>
                                                <td>2.23</td>
                                                <td>9.43</td>
                                            </tr>
                                            <tr>
                                                <td>ROI 5</td>
                                                <td>9.45</td>
                                                <td>2.81</td>
                                                <td>1.77</td>
                                                <td>3.95</td>
                                                <td>6.23</td>
                                                <td>0.92</td>
                                                <td>5.72</td>
                                            </tr>
                                            <tr>
                                                <td>ROI 6</td>
                                                <td>10.07</td>
                                                <td>2.8</td>
                                                <td>2.72</td>
                                                <td>4.04</td>
                                                <td>5.67</td>
                                                <td>1.38</td>
                                                <td>7.82</td>
                                            </tr>
                                            <tr>
                                                <td>ROI 7</td>
                                                <td>19.46</td>
                                                <td>2.81</td>
                                                <td>4.81</td>
                                                <td>7.84</td>
                                                <td>12.99</td>
                                                <td>1.8</td>
                                                <td>23.44</td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
                </div>
            </div>
        );
    }
    private getDisplayValue(data:{attribute:string, value:string}):string {
        let ret:string;
        switch (data.attribute) {
            case "Overall Survival (Months)":
                ret = parseInt(data.value, 10).toFixed(0);
                break;
            default:
                ret = data.value;
                break;
        }
        return ret;
    }
}


