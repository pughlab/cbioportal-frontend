import * as React from "react";
import {ClinicalData} from "../../../shared/api/generated/CBioPortalAPI";
import LazyMobXTable from "shared/components/lazyMobXTable/LazyMobXTable";
import styles from "./style/radiologyReport.module.scss";

export interface IClinicalInformationPatientTableProps {
    data: ClinicalData[];
    patientId: string;
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
        const patientId = this.props.patientId;
        const height = '550';
        const width = '976';

        if (patientId === "CMP-01-02") {
            return (
                <div>
                    <table className={styles["report-table"]}><tr><th>Analysis</th><th>Scan Image</th></tr>
                        <tr><td>
                            <table><tr><td>Study Instance Uid</td><td>1.3.6.1.4.1.12201.1077.1.228576162245353281593824550634323772191</td></tr><tr><td>Series Description</td><td>*MRAC_PET_AC Images</td></tr><tr><td>Acquisition Date</td><td>2017-05-26</td></tr><tr><td>Acquisition Time</td><td>12:58:53</td></tr><tr><td>Modality</td><td>PET/MR</td></tr><tr><td>Radiopharmaceutical</td><td>DCFPyL</td></tr><tr><td>Radiopharmaceutical Start Time</td><td>11:05:00</td></tr><tr><td>Patients Sex</td><td>M</td></tr><tr><td>Patients Size</td><td>1.88</td></tr><tr><td>Patients Weight</td><td>108.0</td></tr><tr><td>Patients Birth Date</td><td>Confidential</td></tr><tr><td>Initial/Net</td><td><table><tr><th>Initial No Rois</th><th>Initial Roi Volume</th><th>Net Matv</th><th>Net Tla</th></tr><tr><td>7.0</td><td>80.84</td><td>31.47</td><td>716.67</td></tr></table></td></tr><tr><td>Radiological Finding</td><td><table><tr><th>Lesion Number</th><th>Lesion Type</th><th>Location</th></tr><tr><td>1.0</td><td>Prostate</td><td>Prostate</td></tr></table></td></tr><tr><td>Automated Analysis Finding</td><td><table><tr><th>Contour Label</th><th>Max</th><th>Min</th><th>Volume</th><th>Active Min</th><th>Active Mean</th><th>Matv</th><th>Tla</th></tr><tr><td>ROI 1</td><td>108.35</td><td>2.81</td><td>51.38</td><td>43.43</td><td>64.97</td><td>9.37</td><td>608.82</td></tr><tr><td>ROI 2</td><td>4.73</td><td>2.8</td><td>14.04</td><td>2.8</td><td>3.26</td><td>14.04</td><td>45.76</td></tr><tr><td>ROI 3</td><td>13.77</td><td>2.8</td><td>3.89</td><td>5.79</td><td>9.05</td><td>1.73</td><td>15.68</td></tr><tr><td>ROI 4</td><td>7.1</td><td>2.86</td><td>2.23</td><td>2.86</td><td>4.23</td><td>2.23</td><td>9.43</td></tr><tr><td>ROI 5</td><td>9.46</td><td>2.81</td><td>1.77</td><td>3.95</td><td>6.23</td><td>0.92</td><td>5.72</td></tr><tr><td>ROI 6</td><td>10.07</td><td>2.8</td><td>2.72</td><td>4.04</td><td>5.67</td><td>1.38</td><td>7.82</td></tr><tr><td>ROI 7</td><td>19.46</td><td>2.81</td><td>4.81</td><td>7.84</td><td>12.99</td><td>1.8</td><td>23.44</td></tr></table></td></tr></table>
                        </td><td><img src={window.location.origin + '/cbioportal/images/radiology/PSMA_Imaging/DCFPYL-1-01-DES_20170526_PETCTMIP.png'} height={height} width={width}/></td></tr>
                        <tr><td>
                            <table><tr><td>Study Instance Uid</td><td>1.3.6.1.4.1.12201.1077.1.216240413971636795293333148204334302812</td></tr><tr><td>Series Description</td><td>AC2-192</td></tr><tr><td>Acquisition Date</td><td>2017-05-26</td></tr><tr><td>Acquisition Time</td><td>14:30:16</td></tr><tr><td>Modality</td><td>PET/CT</td></tr><tr><td>Radiopharmaceutical</td><td>F- -- Fluorine</td></tr><tr><td>Radiopharmaceutical Start Time</td><td>11:05:00</td></tr><tr><td>Patients Sex</td><td>M</td></tr><tr><td>Patients Size</td><td>1.88</td></tr><tr><td>Patients Weight</td><td>108.0</td></tr><tr><td>Patients Birth Date</td><td>Confidential</td></tr><tr><td>Initial/Net</td><td><table><tr><th>Initial No Rois</th><th>Initial Roi Volume</th><th>Net Matv</th><th>Net Tla</th></tr><tr><td>5.0</td><td>79.99</td><td>33.26</td><td>1357.01</td></tr></table></td></tr><tr><td>Radiological Finding</td><td><table><tr><th>Lesion Number</th><th>Lesion Type</th><th>Location</th></tr><tr><td>1.0</td><td>No radiology read</td><td>No radiology read</td></tr></table></td></tr><tr><td>Automated Analysis Finding</td><td><table><tr><th>Contour Label</th><th>Max</th><th>Min</th><th>Volume</th><th>Active Min</th><th>Active Mean</th><th>Matv</th><th>Tla</th></tr><tr><td>ROI 1</td><td>75.19</td><td>2.8</td><td>71.92</td><td>30.09</td><td>50.25</td><td>26.43</td><td>1328.2</td></tr><tr><td>ROI 2</td><td>5.79</td><td>2.82</td><td>2.53</td><td>2.82</td><td>3.75</td><td>2.53</td><td>9.49</td></tr><tr><td>ROI 3</td><td>11.41</td><td>2.85</td><td>2.13</td><td>4.63</td><td>6.94</td><td>1.06</td><td>7.39</td></tr><tr><td>ROI 4</td><td>7.32</td><td>2.83</td><td>1.77</td><td>2.95</td><td>4.29</td><td>1.6</td><td>6.85</td></tr><tr><td>ROI 5</td><td>3.9</td><td>2.8</td><td>1.64</td><td>2.8</td><td>3.1</td><td>1.64</td><td>5.08</td></tr></table></td></tr></table>
                        </td><td><img src={window.location.origin + '/cbioportal/images/radiology/PSMA_Imaging/DCFPYL-1-01-DES_20170526_PETMRMIP.png'}  height={height} width={width}/></td></tr>
                        <tr><td>
                            <table><tr><td>Study Instance Uid</td><td>1.3.6.1.4.1.12201.1077.1.83911718097526278257167000385995803931</td></tr><tr><td>Series Description</td><td>*HDPET_WB_PRR_AC Images</td></tr><tr><td>Acquisition Date</td><td>2017-10-20</td></tr><tr><td>Acquisition Time</td><td>11:22:00</td></tr><tr><td>Modality</td><td>PET/MR</td></tr><tr><td>Radiopharmaceutical</td><td>Solution</td></tr><tr><td>Radiopharmaceutical Start Time</td><td>09:29:00</td></tr><tr><td>Patients Sex</td><td>M</td></tr><tr><td>Patients Size</td><td>1.88</td></tr><tr><td>Patients Weight</td><td>102.97</td></tr><tr><td>Patients Birth Date</td><td>Confidential</td></tr><tr><td>Initial/Net</td><td><table><tr><th>Initial No Rois</th><th>Initial Roi Volume</th><th>Net Matv</th><th>Net Tla</th></tr><tr><td>5.0</td><td>62.52</td><td>15.84</td><td>849.14</td></tr></table></td></tr><tr><td>Radiological Finding</td><td><table><tr><th>Lesion Number</th><th>Lesion Type</th><th>Location</th></tr><tr><td>1.0</td><td>No lesions</td><td>No lesions</td></tr></table></td></tr><tr><td>Automated Analysis Finding</td><td><table><tr><th>Contour Label</th><th>Max</th><th>Min</th><th>Volume</th><th>Active Min</th><th>Active Mean</th><th>Matv</th><th>Tla</th></tr><tr><td>ROI 1</td><td>109.03</td><td>2.9</td><td>54.74</td><td>43.63</td><td>67.26</td><td>12.2</td><td>820.65</td></tr><tr><td>ROI 2</td><td>30.78</td><td>2.93</td><td>2.62</td><td>12.56</td><td>19.44</td><td>0.46</td><td>8.94</td></tr><tr><td>ROI 3</td><td>16.36</td><td>2.9</td><td>2.19</td><td>6.78</td><td>10.28</td><td>0.74</td><td>7.63</td></tr><tr><td>ROI 4</td><td>9.66</td><td>2.92</td><td>1.59</td><td>3.88</td><td>6.08</td><td>1.06</td><td>6.45</td></tr><tr><td>ROI 5</td><td>5.62</td><td>2.96</td><td>1.38</td><td>2.96</td><td>3.97</td><td>1.38</td><td>5.47</td></tr></table></td></tr></table>
                        </td><td><img src={window.location.origin + '/cbioportal/images/radiology/PSMA_Imaging/DCFPYL-1-01-DES_20171020_PETMRMIP.png'}  height={height} width={width}/></td></tr></table>
                </div>
            );

        }
        else if (patientId === "CMP-01-03") {
            return (
                <div>
                    <table className={styles["report-table"]}><tr><th>PET/MR</th><td>Baseline</td><td>Followup</td></tr>
                        <tr><th>Acquisition Date</th><td>2017-06-23</td><td>2017-12-15</td></tr>
                        <tr><th>Radiopharmaceutical Start Time</th><td>09:41:00</td><td>10:51:00</td></tr>
                        <tr><th>Acquisition Time</th><td>11:40:01</td><td>13:10:43</td></tr>
                        <tr><th>Radiopharmaceutical</th><td>DCFPyL</td><td>Solution</td></tr>
                        <tr><th>Series Description</th><td>*WB_3DITER_PRR_AC Images</td><td>*3DITER_WB_PRR_AC Images</td></tr>
                        <tr><th>Study Instance Uid</th><td>1.3.6.1.4.1.12201.1077.1.303489784216945854547997905772158698841</td><td>1.3.6.1.4.1.12201.1077.1.177597511009417124538805883362320459013</td></tr>
                        <tr><th>Initial No Rois</th><td>6.0</td><td>4.0</td></tr>
                        <tr><th>Radiological Finding</th><td><table><tr><th>Lesion Type</th><th>Activity</th><th>Lesion Number</th><th>Location</th></tr><tr><td>Lymph</td><td>6.5</td><td>1.0</td><td>Abdominal</td></tr><tr><td>Lymph</td><td>3.5</td><td>2.0</td><td>Abdominal</td></tr></table></td><td><table><tr><th>Lesion Type</th><th>Activity</th><th>Lesion Number</th><th>Location</th></tr><tr><td>Lymph</td><td>4.1</td><td>1.0</td><td>left iliac</td></tr></table></td></tr>
                        <tr><th>Automated Analysis Finding</th><td><table><tr><th>Contour Label</th><th>Matv</th><th>Active Min</th><th>Active Mean</th><th>Max</th><th>Min</th><th>Volume</th><th>Tla</th></tr><tr><td>ROI 1</td><td>31.16</td><td>28.3</td><td>52.3</td><td>70.56</td><td>2.8</td><td>80.56</td><td>1629.5</td></tr><tr><td>ROI 2</td><td>1.7</td><td>3.02</td><td>4.4</td><td>7.52</td><td>2.8</td><td>2.16</td><td>7.46</td></tr><tr><td>ROI 3</td><td>1.52</td><td>2.81</td><td>3.19</td><td>4.21</td><td>2.81</td><td>1.52</td><td>4.85</td></tr><tr><td>ROI 4</td><td>1.52</td><td>2.81</td><td>3.11</td><td>4.07</td><td>2.81</td><td>1.52</td><td>4.73</td></tr><tr><td>ROI 5</td><td>0.42</td><td>6.42</td><td>9.61</td><td>13.55</td><td>2.81</td><td>1.34</td><td>4.08</td></tr><tr><td>ROI 6</td><td>1.24</td><td>2.81</td><td>3.09</td><td>3.74</td><td>2.81</td><td>1.24</td><td>3.83</td></tr></table></td><td><table><tr><th>Contour Label</th><th>Matv</th><th>Active Min</th><th>Active Mean</th><th>Max</th><th>Min</th><th>Volume</th><th>Tla</th></tr><tr><td>ROI 1</td><td>18.18</td><td>57.78</td><td>101.39</td><td>144.37</td><td>2.1</td><td>67.44</td><td>1843.01</td></tr><tr><td>ROI 2</td><td>2.23</td><td>2.1</td><td>2.51</td><td>3.12</td><td>2.1</td><td>2.23</td><td>5.6</td></tr><tr><td>ROI 3</td><td>1.87</td><td>2.11</td><td>2.59</td><td>3.63</td><td>2.11</td><td>1.87</td><td>4.86</td></tr><tr><td>ROI 4</td><td>1.03</td><td>2.12</td><td>2.4</td><td>2.77</td><td>2.12</td><td>1.03</td><td>2.46</td></tr></table></td></tr>
                    </table><br />
                    <table className={styles["report-table"]}><tr><th>PET/CT</th><td>Baseline</td><td>Followup</td></tr>
                        <tr><th>Acquisition Date</th><td>2017-06-23</td><td>2017-12-15</td></tr>
                        <tr><th>Radiopharmaceutical Start Time</th><td>09:41:00</td><td>10:51:00</td></tr>
                        <tr><th>Acquisition Time</th><td>13:02:14</td><td>15:14:34</td></tr>
                        <tr><th>Radiopharmaceutical</th><td>DCFPyL</td><td>DCFPyL</td></tr>
                        <tr><th>Series Description</th><td>AC-192</td><td>AC192</td></tr>
                        <tr><th>Study Instance Uid</th><td>1.3.6.1.4.1.12201.1077.1.84156226015641524252812832397234277910</td><td>1.3.6.1.4.1.12201.1077.1.262847217405677236675913044235269898390</td></tr>
                        <tr><th>Initial No Rois</th><td>10.0</td><td>10.0</td></tr>
                        <tr><th>Radiological Finding</th><td><table><tr><th>Lesion Type</th><th>Lesion Number</th><th>Location</th></tr><tr><td>No radiology read</td><td>1.0</td><td>No radiology read</td></tr></table></td><td><table><tr><th>Lesion Type</th><th>Lesion Number</th><th>Location</th></tr><tr><td>No radiology read</td><td>1.0</td><td>No radiology read</td></tr></table></td></tr>
                        <tr><th>Automated Analysis Finding</th><td><table><tr><th>Contour Label</th><th>Matv</th><th>Active Min</th><th>Active Mean</th><th>Max</th><th>Min</th><th>Volume</th><th>Tla</th></tr><tr><td>ROI 1</td><td>19.12</td><td>50.99</td><td>90.08</td><td>127.41</td><td>2.2</td><td>72.78</td><td>1722.0</td></tr><tr><td>ROI 2</td><td>0.31</td><td>2.21</td><td>2.63</td><td>5.73</td><td>2.22</td><td>0.95</td><td>0.82</td></tr><tr><td>ROI 3</td><td>0.8</td><td>2.31</td><td>3.27</td><td>2.94</td><td>2.21</td><td>0.6</td><td>2.61</td></tr><tr><td>ROI 4</td><td>0.6</td><td>2.21</td><td>2.44</td><td>3.02</td><td>2.21</td><td>0.58</td><td>1.46</td></tr><tr><td>ROI 5</td><td>0.58</td><td>2.21</td><td>2.53</td><td>2.78</td><td>2.23</td><td>0.53</td><td>1.46</td></tr><tr><td>ROI 6</td><td>0.53</td><td>2.23</td><td>2.47</td><td>2.43</td><td>2.2</td><td>0.4</td><td>1.32</td></tr><tr><td>ROI 7</td><td>0.4</td><td>2.2</td><td>2.3</td><td>2.59</td><td>2.2</td><td>0.35</td><td>0.92</td></tr><tr><td>ROI 8</td><td>0.35</td><td>2.2</td><td>2.3</td><td>2.55</td><td>2.21</td><td>0.35</td><td>0.82</td></tr><tr><td>ROI 9</td><td>0.35</td><td>2.21</td><td>2.36</td><td>3.15</td><td>2.24</td><td>0.35</td><td>0.84</td></tr><tr><td>ROI 10</td><td>0.35</td><td>2.24</td><td>2.53</td><td>3.42</td><td>2.21</td><td>0.31</td><td>0.9</td></tr></table></td><td><table><tr><th>Contour Label</th><th>Matv</th><th>Active Min</th><th>Active Mean</th><th>Max</th><th>Min</th><th>Volume</th><th>Tla</th></tr><tr><td>ROI 1</td><td>12.09</td><td>77.12</td><td>127.66</td><td>192.75</td><td>2.2</td><td>55.86</td><td>1542.89</td></tr><tr><td>ROI 2</td><td>0.35</td><td>2.23</td><td>2.46</td><td>7.38</td><td>2.2</td><td>3.79</td><td>0.87</td></tr><tr><td>ROI 3</td><td>2.53</td><td>2.97</td><td>4.48</td><td>3.56</td><td>2.2</td><td>3.61</td><td>11.33</td></tr><tr><td>ROI 4</td><td>3.61</td><td>2.2</td><td>2.56</td><td>3.11</td><td>2.2</td><td>3.15</td><td>9.26</td></tr><tr><td>ROI 5</td><td>3.15</td><td>2.2</td><td>2.43</td><td>3.17</td><td>2.21</td><td>2.04</td><td>7.66</td></tr><tr><td>ROI 6</td><td>2.04</td><td>2.21</td><td>2.45</td><td>3.23</td><td>2.2</td><td>0.89</td><td>4.99</td></tr><tr><td>ROI 7</td><td>0.89</td><td>2.2</td><td>2.51</td><td>3.54</td><td>2.2</td><td>0.47</td><td>2.23</td></tr><tr><td>ROI 8</td><td>0.47</td><td>2.2</td><td>2.66</td><td>2.8</td><td>2.22</td><td>0.4</td><td>1.24</td></tr><tr><td>ROI 9</td><td>0.4</td><td>2.22</td><td>2.5</td><td>2.74</td><td>2.21</td><td>0.4</td><td>1.0</td></tr><tr><td>ROI 10</td><td>0.4</td><td>2.21</td><td>2.45</td><td>2.75</td><td>2.23</td><td>0.35</td><td>0.98</td></tr></table></td></tr>
                    </table>
                </div>
            );
        }
        else {
            return (
                <div>
                    <table className={styles["report-table"]}><tr><th>PET/MR</th><td>Baseline</td><td>Followup</td></tr>
                        <tr><th>Acquisition Date</th><td>2017-07-28</td><td>2018-01-19</td></tr>
                        <tr><th>Radiopharmaceutical Start Time</th><td>10:02:00</td><td>09:36:00</td></tr>
                        <tr><th>Acquisition Time</th><td>12:00:17</td><td>11:34:08</td></tr>
                        <tr><th>Radiopharmaceutical</th><td>Solution</td><td>DCFPyL</td></tr>
                        <tr><th>Series Description</th><td>*WB HD PET_PRR_AC Images</td><td>HDPET_WB_AC Images</td></tr>
                        <tr><th>Study Instance Uid</th><td>1.3.6.1.4.1.12201.1077.1.137413175055039830342005708267727017804</td><td>1.3.6.1.4.1.12201.1077.75420006518509277661602719966930380249</td></tr>
                        <tr><th>Initial No Rois</th><td>10.0</td><td>4.0</td></tr>
                        <tr><th>Radiological Finding</th><td><table><tr><th>Lesion Type</th><th>Activity</th><th>Lesion Number</th><th>Location</th></tr><tr><td>Lymph</td><td>6.6</td><td>1.0</td><td>left of distal abdominal aorta - level of L3-L4</td></tr><tr><td>Lymph</td><td>6.1</td><td>2.0</td><td>left periaortic </td></tr><tr><td>Lymph</td><td>7.3</td><td>3.0</td><td>posterior aortocaval - level L1-L2</td></tr></table></td><td><table><tr><th>Lesion Type</th><th>Activity</th><th>Lesion Number</th><th>Location</th></tr><tr><td>Lymph</td><td>2.2</td><td>1.0</td><td>left of distal abdominal aorta - level of L3-L4</td></tr><tr><td>Lymph</td><td>3.1</td><td>2.0</td><td>left periaortic</td></tr><tr><td>Lymph</td><td>2.6</td><td>3.0</td><td>posterior aortocaval - level L1-L2</td></tr></table></td></tr>
                        <tr><th>Automated Analysis Finding</th><td><table><tr><th>Contour Label</th><th>Matv</th><th>Active Min</th><th>Active Mean</th><th>Max</th><th>Min</th><th>Volume</th><th>Tla</th></tr><tr><td>ROI 1</td><td>117.48</td><td>10.65</td><td>20.49</td><td>26.57</td><td>2.6</td><td>177.42</td><td>2407.02</td></tr><tr><td>ROI 2</td><td>0.32</td><td>2.65</td><td>2.78</td><td>3.14</td><td>2.62</td><td>0.92</td><td>0.88</td></tr><tr><td>ROI 3</td><td>0.92</td><td>2.62</td><td>2.82</td><td>3.91</td><td>2.66</td><td>0.85</td><td>2.59</td></tr><tr><td>ROI 4</td><td>0.85</td><td>2.66</td><td>3.12</td><td>5.02</td><td>2.6</td><td>0.85</td><td>2.65</td></tr><tr><td>ROI 5</td><td>0.85</td><td>2.6</td><td>3.34</td><td>3.43</td><td>2.6</td><td>0.74</td><td>2.83</td></tr><tr><td>ROI 6</td><td>0.74</td><td>2.6</td><td>2.88</td><td>3.15</td><td>2.6</td><td>0.64</td><td>2.14</td></tr><tr><td>ROI 7</td><td>0.64</td><td>2.6</td><td>2.82</td><td>3.02</td><td>2.6</td><td>0.46</td><td>1.8</td></tr><tr><td>ROI 8</td><td>0.46</td><td>2.6</td><td>2.82</td><td>3.13</td><td>2.64</td><td>0.32</td><td>1.3</td></tr><tr><td>ROI 9</td><td>0.32</td><td>2.64</td><td>2.82</td><td>2.92</td><td>2.62</td><td>0.32</td><td>0.9</td></tr><tr><td>ROI 10</td><td>0.32</td><td>2.62</td><td>2.74</td><td>2.93</td><td>2.65</td><td>0.32</td><td>0.87</td></tr></table></td><td><table><tr><th>Contour Label</th><th>Matv</th><th>Active Min</th><th>Active Mean</th><th>Max</th><th>Min</th><th>Volume</th><th>Tla</th></tr><tr><td>ROI 1</td><td>49.86</td><td>13.28</td><td>24.82</td><td>33.19</td><td>2.8</td><td>87.0</td><td>1237.72</td></tr><tr><td>ROI 2</td><td>2.48</td><td>2.81</td><td>3.39</td><td>5.19</td><td>2.81</td><td>2.48</td><td>8.39</td></tr><tr><td>ROI 3</td><td>0.74</td><td>2.83</td><td>3.07</td><td>3.63</td><td>2.83</td><td>0.74</td><td>2.28</td></tr><tr><td>ROI 4</td><td>0.32</td><td>2.81</td><td>2.91</td><td>3.01</td><td>2.81</td><td>0.32</td><td>0.93</td></tr></table></td></tr>
                    </table><br />
                    <table className={styles["report-table"]}><tr><th>PET/CT</th><td>Baseline</td><td>Followup</td></tr>
                        <tr><th>Acquisition Date</th><td>2017-07-28</td><td>2018-01-19</td></tr>
                        <tr><th>Radiopharmaceutical Start Time</th><td>10:02:00</td><td>09:36:00</td></tr>
                        <tr><th>Acquisition Time</th><td>13:33:38</td><td>12:54:11</td></tr>
                        <tr><th>Radiopharmaceutical</th><td>DCFPyL</td><td>UNSPECIFIED</td></tr>
                        <tr><th>Series Description</th><td>AC-192</td><td>AC192</td></tr>
                        <tr><th>Study Instance Uid</th><td>1.3.6.1.4.1.12201.1077.1.39116508011295396838292366561026832324</td><td>1.3.6.1.4.1.12201.1077.129130379377096384198249353017353670646</td></tr>
                        <tr><th>Initial No Rois</th><td>6.0</td><td>3.0</td></tr>
                        <tr><th>Radiological Finding</th><td><table><tr><th>Lesion Type</th><th>Lesion Number</th><th>Location</th></tr><tr><td>No radiology read</td><td>1.0</td><td>No radiology read</td></tr></table></td><td><table><tr><th>Lesion Type</th><th>Lesion Number</th><th>Location</th></tr><tr><td>No radiology read</td><td>1.0</td><td>No radiology read</td></tr></table></td></tr>
                        <tr><th>Automated Analysis Finding</th><td><table><tr><th>Contour Label</th><th>Matv</th><th>Active Min</th><th>Active Mean</th><th>Max</th><th>Min</th><th>Volume</th><th>Tla</th></tr><tr><td>ROI 1</td><td>81.5</td><td>20.13</td><td>33.58</td><td>50.29</td><td>2.8</td><td>159.47</td><td>2736.88</td></tr><tr><td>ROI 2</td><td>1.15</td><td>2.81</td><td>3.67</td><td>5.46</td><td>2.81</td><td>1.15</td><td>4.23</td></tr><tr><td>ROI 3</td><td>0.84</td><td>2.81</td><td>3.01</td><td>3.34</td><td>2.81</td><td>0.84</td><td>2.54</td></tr><tr><td>ROI 4</td><td>0.78</td><td>2.82</td><td>4.09</td><td>6.58</td><td>2.82</td><td>0.78</td><td>3.17</td></tr><tr><td>ROI 5</td><td>0.53</td><td>2.82</td><td>3.21</td><td>3.72</td><td>2.82</td><td>0.53</td><td>1.71</td></tr><tr><td>ROI 6</td><td>0.42</td><td>2.81</td><td>3.01</td><td>3.3</td><td>2.81</td><td>0.42</td><td>1.27</td></tr></table></td><td><table><tr><th>Contour Label</th><th>Matv</th><th>Active Min</th><th>Active Mean</th><th>Max</th><th>Min</th><th>Volume</th><th>Tla</th></tr><tr><td>ROI 1</td><td>19.63</td><td>35.54</td><td>62.27</td><td>88.82</td><td>2.8</td><td>62.56</td><td>1222.12</td></tr><tr><td>ROI 2</td><td>0.38</td><td>2.8</td><td>3.38</td><td>4.61</td><td>2.8</td><td>0.38</td><td>1.27</td></tr><tr><td>ROI 3</td><td>0.86</td><td>2.81</td><td>3.37</td><td>4.44</td><td>2.81</td><td>0.86</td><td>2.91</td></tr></table></td></tr>
                    </table>
                </div>
            );

        }
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

    private getPatient(data:{attribute:string, value:string}):string {
        let ret:string;
        switch (data.attribute) {
            case "PATIENT_ID":
                ret = parseInt(data.value, 10).toFixed(0);
                break;
            default:
                ret = data.value;
                break;
        }
        return ret;
    }
}


