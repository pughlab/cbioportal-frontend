import * as React from "react";
import {ClinicalData} from "../../../shared/api/generated/CBioPortalAPI";
import LazyMobXTable from "shared/components/lazyMobXTable/LazyMobXTable";

import styles from "./style/patientTable.module.scss";
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

    public render() {

        const tableData = this.props.data && this.props.data.map((el: ClinicalData) => ({
            attribute: el.clinicalAttribute.displayName || '',
            value: el.value
        }));

        return (
            <div>
            <table>
                <caption>Sex: M Size: 1.88 Weight: 108.0 BirthDate: Confidential</caption>
                <tr>
                    <th>seriesDescription</th>
                    <th>acquisitionDate</th>
                    <th>acquisitionTime</th>
                    <th>modality</th>
                    <th>radiopharmaceutical</th>
                    <th>radiopharmaceuticalStartTime</th>
                    <th>initialNoRois</th>
                    <th>initialRoiVolume</th>
                    <th>netMatv</th>
                    <th>netTla</th>
                    <th>radiologicalFinding</th>
                    <th>automatedAnalysisFinding</th>
                </tr>
                <tr>
                    <td>*MRAC_PET_AC Images</td>
                    <td>2017-05-26T00:00:00.000Z</td>
                    <td>12:58:53</td>
                    <td>PET/MR</td>
                    <td>DCFPyL</td>
                    <td>11:05:00</td>
                    <td>7.0</td>
                    <td>80.84</td>
                    <td>31.47</td>
                    <td>716.67</td>
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
                    <td>
                        <table>
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
                        </table>
                    </td>
                </tr>
            </table>
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


