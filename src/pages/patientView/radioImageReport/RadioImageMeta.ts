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
    statsNameUnits: ImageUnitData[]
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
    color: string,
    [propName: string]: any
};

export type ImageUnitData = {
    value: string,
    label: string,
};

export const MODOPTIONS = [
    { value: 'PETCT', label: 'PET/CT' },
    { value: 'PETMR', label: 'PET/MR' },
];

export const STATSOPTIONS = [
    { value: 'max', label: 'Max[SUVbw]' },
    { value: 'mean', label: 'Mean[SUVbw]' },
    { value: 'min', label: 'Min[SUVbw]' },
    { value: 'volume', label: 'Volume[ml]'},
    { value: 'activeMean', label: 'Standard Deviation[SUVbw]'},
    { value: 'matv', label:'SUV Peak[SUVbw]'},
    { value: 'tla', label:'RECIST Long[cm]'}
];

export const LAYOUT = {
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