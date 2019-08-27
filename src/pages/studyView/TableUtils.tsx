import * as React from 'react';
import {getOncoKBCancerGeneListLinkout, getOncoKBReferenceInfo} from "./oncokb/OncoKBUtils";
import styles from "./table/tables.module.scss";
import classnames from 'classnames';
import DefaultTooltip from "public-lib/components/defaultTooltip/DefaultTooltip";
import {ICON_FILTER_OFF, ICON_FILTER_ON} from "shared/lib/Colors";
import {GenePanelList} from "pages/studyView/table/GenePanelModal";
import {getFrequencyStr} from "pages/studyView/StudyViewUtils";
import {GenePanel, GenePanelToGene} from "shared/api/generated/CBioPortalAPI";
import MobxPromiseCache from "shared/lib/MobxPromiseCache";
import {CSSProperties} from "react";
import MobxPromise from "mobxpromise";
import {GeneIdentifier, AlteredCountByGeneWithCancerGene} from "pages/studyView/StudyViewPageStore";
import { If , Then, Else } from "react-if";
import * as _ from "lodash";

export interface IAlteredGenesTablePros {
    promise: MobxPromise<AlteredCountByGeneWithCancerGene[]>;
    width: number;
    height: number;
    filters: number[];
    onUserSelection: (value: GeneIdentifier[]) => void;
    numOfSelectedSamples: number;
    onGeneSelect: (hugoGeneSymbol: string) => void;
    selectedGenes: string[];
    cancerGeneFilterEnabled?: boolean;
    genePanelCache: MobxPromiseCache<{ genePanelId: string }, GenePanel>;
}

export type AlteredGenesTableUserSelectionWithIndex = {
    entrezGeneId: number;
    hugoGeneSymbol: string;
    rowIndex: number;
};

export function getGeneColumnHeaderRender(cellMargin: number, headerName: string, cancerGeneListFilterEnabled: boolean, isFilteredByCancerGeneList: boolean, cancerGeneIconToggle: (event: any) => void) {
    return <div style={{marginLeft: cellMargin}} className={styles.displayFlex} data-test='gene-column-header'>
        {cancerGeneListFilterEnabled && (
            <DefaultTooltip
                mouseEnterDelay={0}
                placement="top"
                overlay={getCancerGeneToggledOverlay(isFilteredByCancerGeneList)}
            >
                <div onClick={cancerGeneIconToggle} className={styles.displayFlex}>
                    {getCancerGeneFilterToggleIcon(isFilteredByCancerGeneList)}
                </div>
            </DefaultTooltip>
        )}
        {headerName}
    </div>
}

export function getGeneColumnCellOverlaySimple(hugoGeneSymbol: string, geneIsSelected: boolean, isCancerGene: boolean, oncokbAnnotated: boolean, isOncogene: boolean, isTumorSuppressorGene: boolean) {
    return <div style={{display: 'flex', flexDirection: 'column', maxWidth: 300, fontSize: 12}}>
        <span>
            {getOncoKBReferenceInfo(hugoGeneSymbol, isCancerGene, oncokbAnnotated, isOncogene, isTumorSuppressorGene)}
        </span>
    </div>;
}

export function getCancerGeneToggledOverlay(cancerGeneFilterEnabled: boolean) {
    if (cancerGeneFilterEnabled) {
        return <span>Filtered by {getOncoKBCancerGeneListLinkout()}. Click to show all genes.</span>
    } else {
        return <span>Showing all genes. Click to filter by {getOncoKBCancerGeneListLinkout()}.</span>
    }
}


export function getCancerGeneFilterToggleIcon(isFilteredByCancerGeneList:boolean) {
    return <span data-test='cancer-gene-filter' className={classnames(styles.cancerGeneIcon, styles.displayFlex)} style={{color: isFilteredByCancerGeneList ? ICON_FILTER_ON : ICON_FILTER_OFF}}><i className='fa fa-filter'></i></span>;
}

export function getFreqColumnRender(type: 'mutation' | 'fusion' | 'cna', numberOfSamplesProfiled: number, numberOfAlteredCases: number, matchingGenePanelIds: string[], toggleModal?: (panelName: string) => void, style?:CSSProperties) {
    const addTotalProfiledOverlay = (profiledType: 'mutation' | 'cna') => (
        <span style={{display: 'flex', flexDirection: 'column'}} data-test='freq-cell-tooltip'>
            <span>{`# of samples profiled for ${profiledType === 'mutation' ? 'mutations' : 'copy number alterations'} in this gene: ${numberOfSamplesProfiled.toLocaleString()}`}</span>
            <GenePanelList
                genePanelIds={matchingGenePanelIds}
                toggleModal={toggleModal!}
            />
        </span>
    );

    function getCellContent() {
        return <span data-test='freq-cell' style={style}>
                {getFrequencyStr(
                    (numberOfAlteredCases / numberOfSamplesProfiled) * 100
                )}
            </span>;
    }

    return (
        <If condition={type === 'fusion'}>
            <Then>
                {getCellContent()}
            </Then>
            <Else>
                <DefaultTooltip
                    placement="right"
                    disabled={type === 'fusion'}
                    overlay={addTotalProfiledOverlay}
                    destroyTooltipOnHide={true}
                >
                    {getCellContent()}
                </DefaultTooltip>
            </Else>
        </If>
    );
}

export function rowIsChecked(entrezGeneId:number, preSelectedRows:AlteredGenesTableUserSelectionWithIndex[], selectedRows:AlteredGenesTableUserSelectionWithIndex[]) {
    const record = _.find(
        preSelectedRows,
        (row: AlteredGenesTableUserSelectionWithIndex) => row.entrezGeneId === entrezGeneId
    );
    if (_.isUndefined(record)) {
        return (
            selectedRows.length > 0 &&
            !_.isUndefined(
                _.find(
                    selectedRows,
                    (row: AlteredGenesTableUserSelectionWithIndex) =>
                        row.entrezGeneId === entrezGeneId
                )
            )
        );
    } else {
        return true;
    }
}

export function rowIsDisabled(entrezGeneId: number, selectedRows:AlteredGenesTableUserSelectionWithIndex[]) {
    return !_.isUndefined(
        _.find(
            selectedRows,
            (row: AlteredGenesTableUserSelectionWithIndex) => row.entrezGeneId === entrezGeneId
        )
    );
}