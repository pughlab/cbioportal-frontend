import * as React from 'react';
import * as _ from 'lodash';
import {
<<<<<<< HEAD
    IAnnotation, IAnnotationColumnProps, default as DefaultAnnotationColumnFormatter
} from "shared/components/mutationTable/column/AnnotationColumnFormatter";
import {IOncoKbCancerGenesWrapper, IOncoKbData, IOncoKbDataWrapper} from "shared/model/OncoKB";
import Civic from "shared/components/annotation/Civic";
import {generateQueryVariant} from "shared/lib/OncoKbUtils";
import {generateQueryVariantId} from "public-lib/lib/OncoKbUtils";
import {CancerGene, IndicatorQueryResp, Query} from "public-lib/api/generated/OncoKbAPI";
import {getAlterationString} from "shared/lib/CopyNumberUtils";
import {ICivicVariant, ICivicGene, ICivicEntry, ICivicVariantData, ICivicGeneData, ICivicGeneDataWrapper, ICivicVariantDataWrapper} from "shared/model/Civic.ts";
import {buildCivicEntry, getCivicCNAVariants} from "shared/lib/CivicUtils";
import {ITrialMatchVariant, ITrialMatchGene, ITrialMatchEntry, ITrialMatchVariantData, ITrialMatchGeneData,
        ITrialMatchGeneDataWrapper, ITrialMatchVariantDataWrapper} from "shared/model/TrialMatch.ts";
import {buildTrialMatchEntry, getTrialMatchCNAVariants} from "shared/lib/TrialMatchUtils";
import PharmacoDB from "shared/components/annotation/PharmacoDB";
import { IPharmacoDBCnaEntry, IPharmacoDBView, IPharmacoDBViewList, IPharmacoDBViewListDataWrapper } from 'shared/model/PharmacoDB';

=======
    buildCivicEntry,
    calculateOncoKbAvailableDataType,
    generateQueryVariantId,
    ICivicEntry,
    ICivicGene,
    ICivicGeneData,
    ICivicVariant,
    ICivicVariantData,
    IOncoKbData,
    OncoKbCardDataType,
    RemoteData,
} from 'cbioportal-utils';
import {
    civicSortValue,
    DEFAULT_ANNOTATION_DATA,
    GenericAnnotation,
    IAnnotation,
    USE_DEFAULT_PUBLIC_INSTANCE_FOR_ONCOKB,
    oncoKbAnnotationSortValue,
} from 'react-mutation-mapper';
import { CancerStudy, DiscreteCopyNumberData } from 'cbioportal-ts-api-client';
import { IAnnotationColumnProps } from 'shared/components/mutationTable/column/AnnotationColumnFormatter';
import { CancerGene, IndicatorQueryResp } from 'oncokb-ts-api-client';
import { getAlterationString } from 'shared/lib/CopyNumberUtils';
import { getCivicCNAVariants } from 'shared/lib/CivicUtils';
>>>>>>> upstream/master

/**
 * @author Selcuk Onur Sumer
 */
<<<<<<< HEAD
export default class AnnotationColumnFormatter
{
    public static getData(copyNumberData:DiscreteCopyNumberData[]|undefined,
                          oncoKbCancerGenes? :IOncoKbCancerGenesWrapper,
                          oncoKbData?: IOncoKbDataWrapper,
                          civicGenes?: ICivicGeneDataWrapper,
                          civicVariants?: ICivicVariantDataWrapper,
                          trialMatchGenes?: ITrialMatchGeneDataWrapper,
                          trialMatchVariants?: ITrialMatchVariantDataWrapper,
                          uniqueSampleKeyToOncoTreeCode?:{[uniqueSampleKey: string]: string},
                          cnaPharmacoDBViewListDW? : IPharmacoDBViewListDataWrapper,
                          studyIdToStudy?: {[studyId:string]:CancerStudy})
    {
=======
export default class AnnotationColumnFormatter {
    public static getData(
        copyNumberData: DiscreteCopyNumberData[] | undefined,
        oncoKbCancerGenes?: RemoteData<CancerGene[] | Error | undefined>,
        oncoKbData?: RemoteData<IOncoKbData | Error | undefined>,
        usingPublicOncoKbInstance?: boolean,
        uniqueSampleKeyToTumorType?: { [sampleId: string]: string },
        civicGenes?: RemoteData<ICivicGene | undefined>,
        civicVariants?: RemoteData<ICivicVariant | undefined>,
        studyIdToStudy?: { [studyId: string]: CancerStudy }
    ) {
>>>>>>> upstream/master
        let value: IAnnotation;

        if (copyNumberData) {
            let oncoKbIndicator: IndicatorQueryResp | undefined = undefined;
            let oncoKbStatus: IAnnotation['oncoKbStatus'] = 'complete';
            let hugoGeneSymbol = copyNumberData[0].gene.hugoGeneSymbol;

            let oncoKbGeneExist = false;
            let isOncoKbCancerGene = false;
            if (oncoKbCancerGenes && !(oncoKbCancerGenes instanceof Error)) {
                oncoKbGeneExist =
                    _.find(
                        oncoKbCancerGenes.result,
                        (gene: CancerGene) =>
                            gene.oncokbAnnotated &&
                            gene.entrezGeneId === copyNumberData[0].entrezGeneId
                    ) !== undefined;
                isOncoKbCancerGene =
                    _.find(
                        oncoKbCancerGenes.result,
                        (gene: CancerGene) =>
                            gene.entrezGeneId === copyNumberData[0].entrezGeneId
                    ) !== undefined;
            }

            // Always show oncogenicity icon even when the indicatorMapResult is empty.
            // We want to show an icon for genes that haven't been annotated by OncoKB
            let oncoKbAvailableDataTypes: OncoKbCardDataType[] = [
                OncoKbCardDataType.BIOLOGICAL,
            ];

            // oncoKbData may exist but it might be an instance of Error, in that case we flag the status as error
            if (oncoKbData && oncoKbData.result instanceof Error) {
                oncoKbStatus = 'error';
            } else if (oncoKbGeneExist) {
                // actually, oncoKbData.result shouldn't be an instance of Error in this case (we already check it above),
                // but we need to check it again in order to avoid TS errors/warnings
                if (
                    oncoKbData &&
                    oncoKbData.result &&
                    !(oncoKbData.result instanceof Error) &&
                    oncoKbData.status === 'complete'
                ) {
                    oncoKbIndicator = AnnotationColumnFormatter.getIndicatorData(
                        copyNumberData,
                        oncoKbData.result,
                        uniqueSampleKeyToTumorType,
                        studyIdToStudy
                    );
                    oncoKbAvailableDataTypes = _.uniq([
                        ...oncoKbAvailableDataTypes,
                        ...calculateOncoKbAvailableDataType(
                            _.values(oncoKbData.result.indicatorMap)
                        ),
                    ]);
                }
                oncoKbStatus = oncoKbData ? oncoKbData.status : 'pending';
            }

            value = {
                hugoGeneSymbol,
                oncoKbStatus,
                oncoKbIndicator,
                oncoKbAvailableDataTypes,
                oncoKbGeneExist,
                isOncoKbCancerGene,
<<<<<<< HEAD
                civicEntry: civicGenes && civicGenes.result && civicVariants && civicVariants.result?
                    AnnotationColumnFormatter.getCivicEntry(copyNumberData, civicGenes.result, civicVariants.result) : undefined,
                civicStatus: civicGenes && civicGenes.status && civicVariants && civicVariants.status ?
                        AnnotationColumnFormatter.getCivicStatus(civicGenes.status, civicVariants.status) : "pending",
                hasCivicVariants: civicGenes && civicGenes.result && civicVariants && civicVariants.result ?
                    AnnotationColumnFormatter.hasCivicVariants(copyNumberData, civicGenes.result, civicVariants.result) : true,
                pharmacoDBView: cnaPharmacoDBViewListDW && cnaPharmacoDBViewListDW.result && uniqueSampleKeyToOncoTreeCode ? 
                    AnnotationColumnFormatter.getPharamacoDBView(copyNumberData, uniqueSampleKeyToOncoTreeCode, cnaPharmacoDBViewListDW.result) : undefined,
                pharmacoDBStatus: cnaPharmacoDBViewListDW && cnaPharmacoDBViewListDW.status ? cnaPharmacoDBViewListDW.status : "pending",
                myCancerGenomeLinks: [],
                trialMatchEntry: trialMatchGenes && trialMatchGenes.result && trialMatchVariants && trialMatchVariants.result?
                    AnnotationColumnFormatter.getTrialMatchEntry(copyNumberData, trialMatchGenes.result, trialMatchVariants.result) : undefined,
                trialMatchStatus: trialMatchGenes && trialMatchGenes.status && trialMatchVariants && trialMatchVariants.status ?
                    AnnotationColumnFormatter.getTrialMatchStatus(trialMatchGenes.status, trialMatchVariants.status) : "pending",
                hasTrialMatchVariants: trialMatchGenes && trialMatchGenes.result && trialMatchVariants && trialMatchVariants.result ?
                    AnnotationColumnFormatter.hasTrialMatchVariants(copyNumberData, trialMatchGenes.result, trialMatchVariants.result) : true,
                hotspotStatus: "complete",
=======
                usingPublicOncoKbInstance:
                    usingPublicOncoKbInstance === undefined
                        ? USE_DEFAULT_PUBLIC_INSTANCE_FOR_ONCOKB
                        : usingPublicOncoKbInstance,
                civicEntry:
                    civicGenes &&
                    civicGenes.result &&
                    civicVariants &&
                    civicVariants.result
                        ? AnnotationColumnFormatter.getCivicEntry(
                              copyNumberData,
                              civicGenes.result,
                              civicVariants.result
                          )
                        : undefined,
                civicStatus:
                    civicGenes &&
                    civicGenes.status &&
                    civicVariants &&
                    civicVariants.status
                        ? AnnotationColumnFormatter.getCivicStatus(
                              civicGenes.status,
                              civicVariants.status
                          )
                        : 'pending',
                hasCivicVariants:
                    civicGenes &&
                    civicGenes.result &&
                    civicVariants &&
                    civicVariants.result
                        ? AnnotationColumnFormatter.hasCivicVariants(
                              copyNumberData,
                              civicGenes.result,
                              civicVariants.result
                          )
                        : true,
                myCancerGenomeLinks: [],
                hotspotStatus: 'complete',
>>>>>>> upstream/master
                isHotspot: false,
                is3dHotspot: false,
            };
        } else {
            value = DEFAULT_ANNOTATION_DATA;
        }

        return value;
    }

<<<<<<< HEAD
  /**
    * Returns an IPharmacoDBView if the oncoTreeCode, Gene and CNA Status match
    * Otherwise it returns an empty object.
    * Todo: Need to match against all 3 parameters
    */
    public static getPharamacoDBView(copyNumberData:DiscreteCopyNumberData[], 
        uniqueSampleKeyToOncoTreeCode:{[uniqueSampleKey: string]: string},
        cnaPharmacoDBViewListDW : IPharmacoDBViewList): IPharmacoDBView | null
    {
        
        let pharmacoDBView = null;
        let geneSymbol: string = copyNumberData[0].gene.hugoGeneSymbol;
        let alteration:number = copyNumberData[0].alteration;
        let status:string = '';
        if(alteration != 0) {
            switch (alteration) {
                case -2:
                    status ='DEEPDEL';
                break;
                case -1:
                    status ='SHALLOWDEL';
                break;
                case 1:
                    status ='GAIN';
                break;
                case 2:
                    status ='AMP';
                break;
                default:
                    status='';
                break;
            } 
        }
        let otc:string = '';
        if(uniqueSampleKeyToOncoTreeCode && uniqueSampleKeyToOncoTreeCode[copyNumberData[0].uniqueSampleKey])
            otc = uniqueSampleKeyToOncoTreeCode[copyNumberData[0].uniqueSampleKey];
        let key:string = geneSymbol + otc + status;
        if (cnaPharmacoDBViewListDW && cnaPharmacoDBViewListDW[key])
        {
            pharmacoDBView = cnaPharmacoDBViewListDW[key] ;
        }
        return pharmacoDBView;
    }

   /**
    * Returns an ICivicEntry if the civicGenes and civicVariants have information about the gene and the mutation (variant) specified. Otherwise it returns
    * an empty object.
    */
    public static getCivicEntry(copyNumberData:DiscreteCopyNumberData[], civicGenes:ICivicGene, 
                                civicVariants:ICivicVariant): ICivicEntry | null
    {
=======
    /**
     * Returns an ICivicEntry if the civicGenes and civicVariants have information about the gene and the mutation (variant) specified. Otherwise it returns
     * an empty object.
     */
    public static getCivicEntry(
        copyNumberData: DiscreteCopyNumberData[],
        civicGenes: ICivicGene,
        civicVariants: ICivicVariant
    ): ICivicEntry | null {
>>>>>>> upstream/master
        let civicEntry = null;
        let geneSymbol: string = copyNumberData[0].gene.hugoGeneSymbol;
        let geneVariants: {
            [name: string]: ICivicVariantData;
        } = getCivicCNAVariants(copyNumberData, geneSymbol, civicVariants);
        let geneEntry: ICivicGeneData = civicGenes[geneSymbol];
        //geneEntry must exists, and only return data for genes with variants or it has a description provided by the Civic API
        if (
            geneEntry &&
            (!_.isEmpty(geneVariants) || geneEntry.description !== '')
        ) {
            civicEntry = buildCivicEntry(geneEntry, geneVariants);
        }

        return civicEntry;
    }

    public static getCivicStatus(
        civicGenesStatus: 'pending' | 'error' | 'complete',
        civicVariantsStatus: 'pending' | 'error' | 'complete'
    ): 'pending' | 'error' | 'complete' {
        if (civicGenesStatus === 'error' || civicVariantsStatus === 'error') {
            return 'error';
        }
        if (
            civicGenesStatus === 'complete' &&
            civicVariantsStatus === 'complete'
        ) {
            return 'complete';
        }

        return 'pending';
    }

    public static hasCivicVariants(
        copyNumberData: DiscreteCopyNumberData[],
        civicGenes: ICivicGene,
        civicVariants: ICivicVariant
    ): boolean {
        let geneSymbol: string = copyNumberData[0].gene.hugoGeneSymbol;
        let geneVariants: {
            [name: string]: ICivicVariantData;
        } = getCivicCNAVariants(copyNumberData, geneSymbol, civicVariants);
        let geneEntry: ICivicGeneData = civicGenes[geneSymbol];

        if (geneEntry && _.isEmpty(geneVariants)) {
            return false;
        }

        return true;
    }

<<<<<<< HEAD
    public static getTrialMatchEntry(copyNumberData:DiscreteCopyNumberData[], trialMatchGenes:ITrialMatchGene,
                                     trialMatchVariants:ITrialMatchVariant): ITrialMatchEntry | null
    {
        let trialEntry = null;
        let geneSymbol: string = copyNumberData[0].gene.hugoGeneSymbol;
        let geneVariants:{[name: string]: ITrialMatchVariantData} = getTrialMatchCNAVariants(copyNumberData, geneSymbol, trialMatchVariants);
        let geneEntry: ITrialMatchGeneData = trialMatchGenes[geneSymbol];
        //Only return data for genes with variants or it has a description provided by the TrialMatch API
        if (!_.isEmpty(geneVariants) || geneEntry && geneEntry.hugoSymbol !== "") {
            trialEntry = buildTrialMatchEntry(geneEntry, geneVariants);
        }

        return trialEntry;
    }

    public static getTrialMatchStatus(trialMatchGenesStatus:"pending" | "error" | "complete", trialMatchVariantsStatus:"pending" | "error" | "complete"): "pending" | "error" | "complete"
    {
        if (trialMatchGenesStatus === "error" || trialMatchVariantsStatus === "error") {
            return "error";
        }
        if (trialMatchGenesStatus === "complete" && trialMatchVariantsStatus === "complete") {
            return "complete";
        }

        return "pending";
    }

    public static hasTrialMatchVariants (copyNumberData:DiscreteCopyNumberData[], trialMatchGenes:ITrialMatchGene, trialMatchVariants:ITrialMatchVariant): boolean
    {
        let geneSymbol: string = copyNumberData[0].gene.hugoGeneSymbol;
        let geneVariants:{[name: string]: ITrialMatchVariantData} = getTrialMatchCNAVariants(copyNumberData, geneSymbol, trialMatchVariants);
        let geneEntry: ITrialMatchGeneData = trialMatchGenes[geneSymbol];

        if (geneEntry && _.isEmpty(geneVariants)) {
            return false;
        }

        return true;
    }

    public static getIndicatorData(copyNumberData:DiscreteCopyNumberData[], oncoKbData:IOncoKbData, studyIdToStudy?: {[studyId:string]:CancerStudy}): IndicatorQueryResp|undefined
    {
        if (oncoKbData.uniqueSampleKeyToTumorType === null || oncoKbData.indicatorMap === null) {
=======
    public static getIndicatorData(
        copyNumberData: DiscreteCopyNumberData[],
        oncoKbData: IOncoKbData,
        uniqueSampleKeyToTumorType?: { [sampleId: string]: string },
        studyIdToStudy?: { [studyId: string]: CancerStudy }
    ): IndicatorQueryResp | undefined {
        if (
            uniqueSampleKeyToTumorType === null ||
            oncoKbData.indicatorMap === null
        ) {
>>>>>>> upstream/master
            return undefined;
        }

        const id = generateQueryVariantId(
            copyNumberData[0].gene.entrezGeneId,
            uniqueSampleKeyToTumorType![copyNumberData[0].uniqueSampleKey],
            getAlterationString(copyNumberData[0].alteration)
        );

        if (oncoKbData.indicatorMap[id]) {
            let indicator = oncoKbData.indicatorMap[id];
            if (indicator.query.tumorType === null && studyIdToStudy) {
                const studyMetaData = studyIdToStudy[copyNumberData[0].studyId];
                if (studyMetaData.cancerTypeId !== 'mixed') {
                    indicator.query.tumorType = studyMetaData.cancerType.name;
                }
            }
            return indicator;
        } else {
            return undefined;
        }
    }

    public static sortValue(
        data: DiscreteCopyNumberData[],
        oncoKbCancerGenes?: RemoteData<CancerGene[] | Error | undefined>,
        usingPublicOncoKbInstance?: boolean,
        oncoKbData?: RemoteData<IOncoKbData | Error | undefined>,
        uniqueSampleKeyToTumorType?: { [sampleId: string]: string },
        civicGenes?: RemoteData<ICivicGene | undefined>,
        civicVariants?: RemoteData<ICivicVariant | undefined>
    ): number[] {
        const annotationData: IAnnotation = AnnotationColumnFormatter.getData(
            data,
            oncoKbCancerGenes,
            oncoKbData,
            usingPublicOncoKbInstance,
            uniqueSampleKeyToTumorType,
            civicGenes,
            civicVariants
        );

<<<<<<< HEAD
    public static sortValue(data:DiscreteCopyNumberData[],
                            oncoKbCancerGenes? :IOncoKbCancerGenesWrapper,
                            oncoKbData?: IOncoKbDataWrapper,
                            civicGenes?: ICivicGeneDataWrapper,
                            civicVariants?: ICivicVariantDataWrapper,
                            trialMatchGenes?: ITrialMatchGeneDataWrapper,
                            trialMatchVariants?: ITrialMatchVariantDataWrapper,
                            uniqueSampleKeyToOncoTreeCode?:{[uniqueSampleKey: string]: string},
                            cnaPharmacoDBViewListDW?:IPharmacoDBViewListDataWrapper):number[] {
        const annotationData:IAnnotation = AnnotationColumnFormatter.getData(data, oncoKbCancerGenes, oncoKbData, civicGenes, civicVariants, trialMatchGenes, trialMatchVariants, uniqueSampleKeyToOncoTreeCode, cnaPharmacoDBViewListDW);

        return _.flatten([oncoKbAnnotationSortValue(annotationData.oncoKbIndicator), Civic.sortValue(annotationData.civicEntry), annotationData.isOncoKbCancerGene ? 1 : 0,
            PharmacoDB.sortValue(annotationData.pharmacoDBView)]);
    }

    public static renderFunction(data:DiscreteCopyNumberData[], columnProps:IAnnotationColumnProps)
    {
        const annotation:IAnnotation = AnnotationColumnFormatter.getData(data, columnProps.oncoKbCancerGenes, columnProps.oncoKbData, columnProps.civicGenes, columnProps.civicVariants,  columnProps.trialMatchGenes, columnProps.trialMatchVariants,  columnProps.uniqueSampleKeyToOncoTreeCode, columnProps.cnaPharmacoDBViewListDW, columnProps.studyIdToStudy);

        let evidenceQuery:Query|undefined;

        if (columnProps.oncoKbData &&
            columnProps.oncoKbData.result &&
            !(columnProps.oncoKbData.result instanceof Error))
        {
            evidenceQuery = this.getEvidenceQuery(data, columnProps.oncoKbData.result);
        }

        return DefaultAnnotationColumnFormatter.mainContent(annotation,
            columnProps,
            columnProps.oncoKbEvidenceCache,
            evidenceQuery,
            columnProps.pubMedCache,
            columnProps.pharmacoDBCnaCache);
=======
        return _.flatten([
            oncoKbAnnotationSortValue(annotationData.oncoKbIndicator),
            civicSortValue(annotationData.civicEntry),
            annotationData.isOncoKbCancerGene ? 1 : 0,
        ]);
    }

    public static renderFunction(
        data: DiscreteCopyNumberData[],
        columnProps: IAnnotationColumnProps
    ) {
        const annotation: IAnnotation = AnnotationColumnFormatter.getData(
            data,
            columnProps.oncoKbCancerGenes,
            columnProps.oncoKbData,
            columnProps.usingPublicOncoKbInstance,
            columnProps.uniqueSampleKeyToTumorType,
            columnProps.civicGenes,
            columnProps.civicVariants,
            columnProps.studyIdToStudy
        );

        return <GenericAnnotation {...columnProps} annotation={annotation} />;
>>>>>>> upstream/master
    }
}
