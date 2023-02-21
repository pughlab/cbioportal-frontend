import * as React from 'react';
import { If, Then, Else } from 'react-if';
import { observer } from 'mobx-react';
import * as _ from 'lodash';
import {
    ITrialMatch,
} from '../../../shared/model/MatchMiner';
import styles from './style/trialMatch.module.scss';
import { action, computed, makeObservable, observable } from 'mobx';
import LazyMobXTable from '../../../shared/components/lazyMobXTable/LazyMobXTable';
import SampleManager from '../SampleManager';
import {
    DefaultTooltip,
    placeArrowBottomLeft,
} from 'cbioportal-frontend-commons';
import { getAgeRangeDisplay } from './TrialMatchTableUtils';
import TrialMatchFeedback from './TrialMatchFeedback';
import AppConfig from 'appConfig';
import { Button } from 'react-bootstrap';

export type ITrialMatchNewProps = {
    sampleManager: SampleManager | null;
    trialMatches: ITrialMatch[];
    containerWidth: number;
};

export type ISelectedTrialFeedbackFormData = {
    nctId: string;
    protocolNo: string;
};

enum ColumnKey {
    TITLE = 'Trial',
    ARM = 'Arm',
    GENE = 'Gene',
    MATCHTYPE = 'Match Type',
    MATCHING_CRITERIA = 'Matching Criteria',
    STATUS = 'Status',
}

enum ColumnWidth {
    STATUS = 140,
}

enum AlterationType {
    MUTATION = 'Mutation',
    CNA = 'Copy Number Alteration',
    MSI = 'Microsatellite Instability',
    WILDTYPE = 'Wildtype',
}

class TrialMatchNewTableComponent extends LazyMobXTable<ITrialMatch> {}

@observer
export default class TrialMatchTableNew extends React.Component<ITrialMatchNewProps> {
    constructor(props: ITrialMatchNewProps) {
        super(props);
        makeObservable(this);
    }

    @computed
    get columnWidths() {
        return {
            [ColumnKey.STATUS]: ColumnWidth.STATUS,
            [ColumnKey.TITLE]:
                0.30 * (this.props.containerWidth - ColumnWidth.STATUS),
            [ColumnKey.ARM]:
                0.10 * (this.props.containerWidth - ColumnWidth.STATUS),
            [ColumnKey.GENE]:
                0.10 * (this.props.containerWidth - ColumnWidth.STATUS),
            [ColumnKey.MATCHTYPE]:
                0.10 * (this.props.containerWidth - ColumnWidth.STATUS),
            [ColumnKey.MATCHING_CRITERIA]:
                0.40 * (this.props.containerWidth - ColumnWidth.STATUS),
        };
    }

    private _columns = [
        {
            name: ColumnKey.TITLE,
            render: (trialmatch: ITrialMatch) => (
                <div>
                    <If condition={trialmatch.protocolNo.length > 0}>
                        <div>
                                {trialmatch.protocolNo}
                        </div>
                    </If>
                    
                    <If condition={trialmatch.nctId.length > 0}>
                        <div>
                            <a
                                target="_blank"
                                href={
                                    'https://clinicaltrials.gov/ct2/show/' +
                                    trialmatch.nctId
                                }
                            >
                                {trialmatch.nctId}
                            </a>
                        </div>
                    </If>
                    <div>{trialmatch.shortTitle}</div>
                </div>
            ),
            sortBy: (trialmatch: ITrialMatch) => trialmatch.shortTitle,
            width: this.columnWidths[ColumnKey.TITLE],
        },
        {
            name: ColumnKey.ARM,
            render: (trialmatch: ITrialMatch) => (
                <div>
                    <div>{trialmatch.armDescription}</div>
                </div>
            ),
            sortBy: (trialmatch: ITrialMatch) => trialmatch.armDescription,
            width: this.columnWidths[ColumnKey.ARM],
        },
        {
            name: ColumnKey.GENE,
            render: (trialmatch: ITrialMatch) => (
                <div>
                    <div>{trialmatch.trueHugoSymbol}</div>
                </div>
            ),
            sortBy: (trialmatch: ITrialMatch) => trialmatch.trueHugoSymbol,
            width: this.columnWidths[ColumnKey.GENE],
        },
        {
            name: ColumnKey.MATCHTYPE,
            render: (trialmatch: ITrialMatch) => (
                <div>
                    <div>{trialmatch.matchType}</div>
                </div>
            ),
            sortBy: (trialmatch: ITrialMatch) => trialmatch.matchType,
            width: this.columnWidths[ColumnKey.MATCHTYPE],
        },
        {
            name: ColumnKey.MATCHING_CRITERIA,
            render: (trialmatch: ITrialMatch) => (
                <div>
                    genomicAlteration:
                    <div>&nbsp;{trialmatch.genomicAlteration}</div>
                    <br/>
                    oncotreePrimaryDiagnosisName:
                    <div>&nbsp;{trialmatch.oncotreePrimaryDiagnosisName}</div>
                    <br/>
                    trialOncotreePrimaryDiagnosis:
                    <div>&nbsp;{trialmatch.trialOncotreePrimaryDiagnosis}</div>
                    <br/>
                    trueProteinChange:
                    <div>&nbsp;{trialmatch.trueProteinChange}</div>
                    <br/>
                </div>
            ),
            sortBy: (trialmatch: ITrialMatch) => trialmatch.genomicAlteration,
            width: this.columnWidths[ColumnKey.MATCHING_CRITERIA],
        },
        {
            name: ColumnKey.STATUS,
            render: (trialmatch: ITrialMatch) => (
                <div className={styles.statusContainer}>            
                        <span className={styles.statusBackground}>
                            {trialmatch.status}
                        </span>                
                </div>
            ),
            sortBy: (trialmatch: ITrialMatch) => trialmatch.status,
            width: this.columnWidths[ColumnKey.STATUS],
        },
    ];

    // public getSampleIdIcons(sampleIds: string[]) {
    //     let sortedSampleIds = sampleIds;
    //     if (sampleIds.length > 1) {
    //         const sampleOrder = this.props.sampleManager!.getSampleIdsInOrder();
    //         sortedSampleIds = sampleOrder.filter((sampleId: string) =>
    //             sampleIds.includes(sampleId)
    //         );
    //     }
    //     return (
    //         <React.Fragment>
    //             {sortedSampleIds.map((sampleId: string) => (
    //                 <span className={styles.genomicSpan}>
    //                     {this.props.sampleManager!.getComponentForSample(
    //                         sampleId,
    //                         1,
    //                         ''
    //                     )}
    //                 </span>
    //             ))}
    //         </React.Fragment>
    //     );
    // }

    // public getClinicalMatch(clinicalGroupMatch: IClinicalGroupMatch) {
    //     return (
    //         <div
    //             className={styles.firstRight}
    //             style={
    //                 clinicalGroupMatch.matches || clinicalGroupMatch.notMatches
    //                     ? {}
    //                     : { width: '100%' }
    //             }
    //         >
    //             <span className={styles.secondLeft}>
    //                 {getAgeRangeDisplay(clinicalGroupMatch.trialAgeNumerical)}
    //             </span>
    //             <span className={styles.secondRight}>
    //                 {clinicalGroupMatch.trialOncotreePrimaryDiagnosis.positive.join(
    //                     ', '
    //                 )}
    //                 {clinicalGroupMatch.trialOncotreePrimaryDiagnosis.negative
    //                     .length > 0 && (
    //                     <span>
    //                         <b> except </b>
    //                         <If
    //                             condition={
    //                                 clinicalGroupMatch
    //                                     .trialOncotreePrimaryDiagnosis.negative
    //                                     .length < 4
    //                             }
    //                         >
    //                             <Then>
    //                                 <span>
    //                                     {clinicalGroupMatch.trialOncotreePrimaryDiagnosis.negative
    //                                         .join(', ')
    //                                         .replace(/,(?!.*,)/gim, ' and')}
    //                                 </span>
    //                             </Then>
    //                             <Else>
    //                                 <DefaultTooltip
    //                                     placement="bottomLeft"
    //                                     trigger={['hover', 'focus']}
    //                                     overlay={this.tooltipClinicalContent(
    //                                         clinicalGroupMatch
    //                                             .trialOncotreePrimaryDiagnosis
    //                                             .negative
    //                                     )}
    //                                     destroyTooltipOnHide={true}
    //                                     onPopupAlign={placeArrowBottomLeft}
    //                                 >
    //                                     <span>
    //                                         {clinicalGroupMatch
    //                                             .trialOncotreePrimaryDiagnosis
    //                                             .negative.length +
    //                                             ` cancer types`}
    //                                     </span>
    //                                 </DefaultTooltip>
    //                             </Else>
    //                         </If>
    //                     </span>
    //                 )}
    //             </span>
    //         </div>
    //     );
    // }

    // @action
    // public openCloseFeedbackForm(data?: ISelectedTrialFeedbackFormData) {
    //     this.selectedTrialFeedbackFormData = data;
    // }

    // public getGenomicMatch(matches: IGenomicMatchType) {
    //     return (
    //         <React.Fragment>
    //             {matches.MUTATION.map(
    //                 (genomicGroupMatch: IGenomicGroupMatch) => (
    //                     <div>
    //                         <span style={{ marginRight: 5 }}>
    //                             <b>
    //                                 {
    //                                     genomicGroupMatch.patientGenomic!
    //                                         .trueHugoSymbol
    //                                 }{' '}
    //                             </b>
    //                             {genomicGroupMatch.patientGenomic!.trueProteinChange.join(
    //                                 ', '
    //                             )}
    //                         </span>
    //                         <DefaultTooltip
    //                             placement="bottomLeft"
    //                             trigger={['hover', 'focus']}
    //                             overlay={this.tooltipGenomicContent(
    //                                 genomicGroupMatch.genomicAlteration
    //                             )}
    //                             destroyTooltipOnHide={false}
    //                             onPopupAlign={placeArrowBottomLeft}
    //                         >
    //                             <i
    //                                 className={
    //                                     'fa fa-info-circle ' + styles.icon
    //                                 }
    //                             ></i>
    //                         </DefaultTooltip>
    //                     </div>
    //                 )
    //             )}
    //             {matches.MSI.length > 0 && (
    //                 <div>
    //                     Tumor is <b>MSI-H</b>
    //                 </div>
    //             )}
    //             {matches.CNA.map((genomicGroupMatch: IGenomicGroupMatch) => (
    //                 <div>
    //                     {this.getGenomicAlteration(
    //                         genomicGroupMatch.genomicAlteration
    //                     )}
    //                 </div>
    //             ))}
    //             {matches.WILDTYPE.map(
    //                 (genomicGroupMatch: IGenomicGroupMatch) => (
    //                     <div>
    //                         {this.getGenomicAlteration(
    //                             genomicGroupMatch.genomicAlteration
    //                         )}
    //                     </div>
    //                 )
    //             )}
    //         </React.Fragment>
    //     );
    // }

    // public getGenomicNotMatch(notMatches: IGenomicMatchType) {
    //     let mutationAndCnagenemicAlterations: string[] = [];
    //     if (notMatches.MUTATION.length > 0) {
    //         mutationAndCnagenemicAlterations =
    //             notMatches.MUTATION[0].genomicAlteration;
    //     }
    //     if (notMatches.CNA.length > 0) {
    //         mutationAndCnagenemicAlterations = mutationAndCnagenemicAlterations.concat(
    //             notMatches.CNA[0].genomicAlteration
    //         );
    //     }
    //     return (
    //         <React.Fragment>
    //             {mutationAndCnagenemicAlterations.length > 0 && (
    //                 <div>
    //                     <span className={styles.genomicSpan}>
    //                         {this.getDescriptionForNotMatches(
    //                             mutationAndCnagenemicAlterations,
    //                             3,
    //                             AlterationType.MUTATION
    //                         )}
    //                     </span>
    //                     <DefaultTooltip
    //                         placement="bottomLeft"
    //                         trigger={['hover', 'focus']}
    //                         overlay={this.tooltipGenomicContent(
    //                             mutationAndCnagenemicAlterations
    //                         )}
    //                         destroyTooltipOnHide={false}
    //                         onPopupAlign={placeArrowBottomLeft}
    //                     >
    //                         <i
    //                             className={'fa fa-info-circle ' + styles.icon}
    //                         ></i>
    //                     </DefaultTooltip>
    //                 </div>
    //             )}
    //             {notMatches.MSI.length > 0 && (
    //                 <div>
    //                     Tumor is <b>not MSI-H</b>
    //                 </div>
    //             )}
    //             {notMatches.WILDTYPE.length > 0 && (
    //                 <div>
    //                     <span className={styles.genomicSpan}>
    //                         {this.getDescriptionForNotMatches(
    //                             notMatches.WILDTYPE[0].genomicAlteration,
    //                             3,
    //                             AlterationType.WILDTYPE
    //                         )}
    //                     </span>
    //                     <DefaultTooltip
    //                         placement="bottomLeft"
    //                         trigger={['hover', 'focus']}
    //                         overlay={this.tooltipGenomicContent(
    //                             notMatches.WILDTYPE[0].genomicAlteration
    //                         )}
    //                         destroyTooltipOnHide={false}
    //                         onPopupAlign={placeArrowBottomLeft}
    //                     >
    //                         <i
    //                             className={'fa fa-info-circle ' + styles.icon}
    //                         ></i>
    //                     </DefaultTooltip>
    //                 </div>
    //             )}
    //         </React.Fragment>
    //     );
    // }

    // public getGenomicAlteration(data: string[]) {
    //     const filteredData = data.map((e: string) => e.split(' '));
    //     return (
    //         <div>
    //             {filteredData.map((e: string[]) => (
    //                 <div>
    //                     <b>{e[0]}</b> {e[1]}
    //                 </div>
    //             ))}
    //         </div>
    //     );
    // }

    // public tooltipGenomicContent(data: string[]) {
    //     return (
    //         <div className={styles.tooltip}>
    //             <div>
    //                 Genomic selection{' '}
    //                 {data.length > 1 ? 'criteria' : 'criterion'} specified in
    //                 the trial:
    //             </div>
    //             {data.map((e: string) => (
    //                 <div className={styles.genomicSpan}>
    //                     <If condition={e.includes('!')}>
    //                         <Then>
    //                             <b>Not </b>
    //                             {e.replace(/!/g, '')}
    //                         </Then>
    //                         <Else>{e}</Else>
    //                     </If>
    //                 </div>
    //             ))}
    //         </div>
    //     );
    // }

    // public tooltipClinicalContent(data: string[]) {
    //     return (
    //         <div className={styles.tooltip}>
    //             <ul className={styles.alterationUl}>
    //                 {data.map((cancerType: string) => (
    //                     <li>{cancerType}</li>
    //                 ))}
    //             </ul>
    //         </div>
    //     );
    // }

    // public getDescriptionForNotMatches(
    //     genomicAlteration: string[],
    //     threshold: number,
    //     type: string
    // ) {
    //     const hugoSymbolSet = new Set(
    //         [...genomicAlteration].map((s: string) => s.split(' ')[0])
    //     );
    //     let genomicAlterationContent = '';
    //     if (type === AlterationType.MUTATION) {
    //         if (hugoSymbolSet.size === 1) {
    //             genomicAlterationContent =
    //                 [...hugoSymbolSet].join(', ') +
    //                 ' ' +
    //                 [...genomicAlteration]
    //                     .map((s: string) => s.split(' ')[1].replace(/!/g, ''))
    //                     .join(', ');
    //             return `Negative for ${genomicAlterationContent}`;
    //         } else if (hugoSymbolSet.size <= threshold) {
    //             genomicAlterationContent = [...hugoSymbolSet].join(', ');
    //         } else {
    //             genomicAlterationContent = `${hugoSymbolSet.size} genes`;
    //         }
    //         return `Negative for alterations in ${genomicAlterationContent}`;
    //     } else if (type === AlterationType.WILDTYPE) {
    //         if (hugoSymbolSet.size <= threshold) {
    //             genomicAlterationContent = [...hugoSymbolSet].join(', ');
    //         } else {
    //             genomicAlterationContent = `${hugoSymbolSet.size} genes`;
    //         }
    //         return `Tumor doesn't have ${genomicAlterationContent} defined by the trial`;
    //     }
    //     return '';
    // }

    render() {
        return (
            <div>
                <TrialMatchNewTableComponent
                    data={this.props.trialMatches}
                    columns={this._columns}
                    showCopyDownload={false}
                />
                <div className={styles.powered}>
                    Powered by{' '}
                    <a href="https://oncokb.org/" target="_blank">
                        OncoKB
                    </a>{' '}
                    &{' '}
                    <a href="https://matchminer.org/" target="_blank">
                        MatchMiner
                    </a>
                </div>
            </div>
        );
    }
}
