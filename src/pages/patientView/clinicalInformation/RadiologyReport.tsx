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
                    <table className={styles["report-table"]}><tr><th>PET/MR</th><th>Baseline</th><th>Followup</th></tr>
                        <tr><th>Acquisition Date</th><td>2017-06-23</td><td>2017-12-15</td></tr>
                        <tr><th>Radiopharmaceutical Start Time</th><td>09:41:00</td><td>10:51:00</td></tr>
                        <tr><th>Acquisition Time</th><td>11:40:01</td><td>13:10:43</td></tr>
                        <tr><th>Radiopharmaceutical</th><td>DCFPyL</td><td>Solution</td></tr>
                        <tr><th>Series Description</th><td>*WB_3DITER_PRR_AC Images</td><td>*3DITER_WB_PRR_AC Images</td></tr>
                        <tr><th>Study Instance Uid</th><td>1.3.6.1.4.1.12201.1077.1.303489784216945854547997905772158698841</td><td>1.3.6.1.4.1.12201.1077.1.177597511009417124538805883362320459013</td></tr>
                        <tr><th>Radiological Finding</th><td><table><tr><th>Lesion Type</th><th>Activity</th><th>Lesion Number</th><th>Location</th></tr><tr><td>Lymph</td><td>6.5</td><td>1.0</td><td>Abdominal</td></tr><tr><td>Lymph</td><td>3.5</td><td>2.0</td><td>Abdominal</td></tr></table></td><td><table><tr><th>Lesion Type</th><th>Activity</th><th>Lesion Number</th><th>Location</th></tr><tr><td>Lymph</td><td>4.1</td><td>1.0</td><td>left iliac</td></tr></table></td></tr>
                        <tr><th>Automated Analysis Finding</th><td><table><tr><th>Contour Label</th><th>Matv</th><th>Active Min</th><th>Active Mean</th><th>Max</th><th>Min</th><th>Volume</th><th>Tla</th></tr><tr><td>ROI 1</td><td>31.16</td><td>28.3</td><td>52.3</td><td>70.56</td><td>2.8</td><td>80.56</td><td>1629.5</td></tr><tr><td>ROI 2</td><td>1.7</td><td>3.02</td><td>4.4</td><td>7.52</td><td>2.8</td><td>2.16</td><td>7.46</td></tr><tr><td>ROI 3</td><td>1.52</td><td>2.81</td><td>3.19</td><td>4.21</td><td>2.81</td><td>1.52</td><td>4.85</td></tr><tr><td>ROI 4</td><td>1.52</td><td>2.81</td><td>3.11</td><td>4.07</td><td>2.81</td><td>1.52</td><td>4.73</td></tr><tr><td>ROI 5</td><td>0.42</td><td>6.42</td><td>9.61</td><td>13.55</td><td>2.81</td><td>1.34</td><td>4.08</td></tr><tr><td>ROI 6</td><td>1.24</td><td>2.81</td><td>3.09</td><td>3.74</td><td>2.81</td><td>1.24</td><td>3.83</td></tr></table></td><td><table><tr><th>Contour Label</th><th>Matv</th><th>Active Min</th><th>Active Mean</th><th>Max</th><th>Min</th><th>Volume</th><th>Tla</th></tr><tr><td>ROI 1</td><td>18.18</td><td>57.78</td><td>101.39</td><td>144.37</td><td>2.1</td><td>67.44</td><td>1843.01</td></tr><tr><td>ROI 2</td><td>2.23</td><td>2.1</td><td>2.51</td><td>3.12</td><td>2.1</td><td>2.23</td><td>5.6</td></tr><tr><td>ROI 3</td><td>1.87</td><td>2.11</td><td>2.59</td><td>3.63</td><td>2.11</td><td>1.87</td><td>4.86</td></tr><tr><td>ROI 4</td><td>1.03</td><td>2.12</td><td>2.4</td><td>2.77</td><td>2.12</td><td>1.03</td><td>2.46</td></tr></table></td></tr>
                    </table><hr />
                    <table className={styles["report-table"]}><tr><th>PET/CT</th><th>Baseline</th><th>Followup</th></tr>
                        <tr><th>Acquisition Date</th><td>2017-06-23</td><td>2017-12-15</td></tr>
                        <tr><th>Radiopharmaceutical Start Time</th><td>09:41:00</td><td>10:51:00</td></tr>
                        <tr><th>Acquisition Time</th><td>13:02:14</td><td>15:14:34</td></tr>
                        <tr><th>Radiopharmaceutical</th><td>DCFPyL</td><td>DCFPyL</td></tr>
                        <tr><th>Series Description</th><td>AC-192</td><td>AC192</td></tr>
                        <tr><th>Study Instance Uid</th><td>1.3.6.1.4.1.12201.1077.1.84156226015641524252812832397234277910</td><td>1.3.6.1.4.1.12201.1077.1.262847217405677236675913044235269898390</td></tr>
                        <tr><th>Radiological Finding</th><td><table><tr><th>Lesion Type</th><th>Lesion Number</th><th>Location</th></tr><tr><td>No radiology read</td><td>1.0</td><td>No radiology read</td></tr></table></td><td><table><tr><th>Lesion Type</th><th>Lesion Number</th><th>Location</th></tr><tr><td>No radiology read</td><td>1.0</td><td>No radiology read</td></tr></table></td></tr>
                        <tr><th>Automated Analysis Finding</th><td><table><tr><th>Contour Label</th><th>Matv</th><th>Active Min</th><th>Active Mean</th><th>Max</th><th>Min</th><th>Volume</th><th>Tla</th></tr><tr><td>ROI 1</td><td>19.12</td><td>50.99</td><td>90.08</td><td>127.41</td><td>2.2</td><td>72.78</td><td>1722.0</td></tr><tr><td>ROI 2</td><td>0.31</td><td>2.21</td><td>2.63</td><td>5.73</td><td>2.22</td><td>0.95</td><td>0.82</td></tr><tr><td>ROI 3</td><td>0.8</td><td>2.31</td><td>3.27</td><td>2.94</td><td>2.21</td><td>0.6</td><td>2.61</td></tr><tr><td>ROI 4</td><td>0.6</td><td>2.21</td><td>2.44</td><td>3.02</td><td>2.21</td><td>0.58</td><td>1.46</td></tr><tr><td>ROI 5</td><td>0.58</td><td>2.21</td><td>2.53</td><td>2.78</td><td>2.23</td><td>0.53</td><td>1.46</td></tr><tr><td>ROI 6</td><td>0.53</td><td>2.23</td><td>2.47</td><td>2.43</td><td>2.2</td><td>0.4</td><td>1.32</td></tr><tr><td>ROI 7</td><td>0.4</td><td>2.2</td><td>2.3</td><td>2.59</td><td>2.2</td><td>0.35</td><td>0.92</td></tr><tr><td>ROI 8</td><td>0.35</td><td>2.2</td><td>2.3</td><td>2.55</td><td>2.21</td><td>0.35</td><td>0.82</td></tr><tr><td>ROI 9</td><td>0.35</td><td>2.21</td><td>2.36</td><td>3.15</td><td>2.24</td><td>0.35</td><td>0.84</td></tr><tr><td>ROI 10</td><td>0.35</td><td>2.24</td><td>2.53</td><td>3.42</td><td>2.21</td><td>0.31</td><td>0.9</td></tr></table></td><td><table><tr><th>Contour Label</th><th>Matv</th><th>Active Min</th><th>Active Mean</th><th>Max</th><th>Min</th><th>Volume</th><th>Tla</th></tr><tr><td>ROI 1</td><td>12.09</td><td>77.12</td><td>127.66</td><td>192.75</td><td>2.2</td><td>55.86</td><td>1542.89</td></tr><tr><td>ROI 2</td><td>0.35</td><td>2.23</td><td>2.46</td><td>7.38</td><td>2.2</td><td>3.79</td><td>0.87</td></tr><tr><td>ROI 3</td><td>2.53</td><td>2.97</td><td>4.48</td><td>3.56</td><td>2.2</td><td>3.61</td><td>11.33</td></tr><tr><td>ROI 4</td><td>3.61</td><td>2.2</td><td>2.56</td><td>3.11</td><td>2.2</td><td>3.15</td><td>9.26</td></tr><tr><td>ROI 5</td><td>3.15</td><td>2.2</td><td>2.43</td><td>3.17</td><td>2.21</td><td>2.04</td><td>7.66</td></tr><tr><td>ROI 6</td><td>2.04</td><td>2.21</td><td>2.45</td><td>3.23</td><td>2.2</td><td>0.89</td><td>4.99</td></tr><tr><td>ROI 7</td><td>0.89</td><td>2.2</td><td>2.51</td><td>3.54</td><td>2.2</td><td>0.47</td><td>2.23</td></tr><tr><td>ROI 8</td><td>0.47</td><td>2.2</td><td>2.66</td><td>2.8</td><td>2.22</td><td>0.4</td><td>1.24</td></tr><tr><td>ROI 9</td><td>0.4</td><td>2.22</td><td>2.5</td><td>2.74</td><td>2.21</td><td>0.4</td><td>1.0</td></tr><tr><td>ROI 10</td><td>0.4</td><td>2.21</td><td>2.45</td><td>2.75</td><td>2.23</td><td>0.35</td><td>0.98</td></tr></table></td></tr>
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


