import * as React from 'react';
import {If, Else, Then } from 'react-if';
import DefaultTooltip from "shared/components/defaultTooltip/DefaultTooltip";
import 'rc-tooltip/assets/bootstrap_white.css';
import {Mutation} from "../../../../shared/api/generated/CBioPortalAPI";
import SampleManager from "../../sampleManager";
import {isUncalled} from 'shared/lib/MutationUtils';

export default class CancerCellFractionColumnFormatter {
    static barWidth = 6;
    static barSpacing = 3;
    static maxBarHeight = 12;
    static indexToBarLeft = (n:number) => n*(CancerCellFractionColumnFormatter.barWidth + CancerCellFractionColumnFormatter.barSpacing);

    public static getComponentForSampleArgs<T extends {cancerCellFraction:number,geneticProfileId:string}>(mutation:T) {
        const ccf = mutation.cancerCellFraction;

        let opacity: number = 1;
        let extraTooltipText: string = '';
        if (isUncalled(mutation.geneticProfileId)) {
            if (ccf > 0) {
                opacity = 0.1;
                extraTooltipText = "Mutation has supporting reads, but wasn't called";
            } else {
                opacity = 0;
                extraTooltipText = "Mutation has 0 supporting reads and wasn't called";
            }
        }
        return {
            opacity,
            extraTooltipText
        };
    }

    public static convertMutationToSampleElement<T extends {sampleId:string, cancerCellFraction:number, geneticProfileId:string}>(mutation:T, color:string, barX:number, sampleComponent:any) {
        const ccf = mutation.cancerCellFraction;
        if (ccf < 0 ) {
            return null;
        }
        const barHeight = (isNaN(ccf) ? 0 : ccf)*CancerCellFractionColumnFormatter.maxBarHeight;
        const barY = CancerCellFractionColumnFormatter.maxBarHeight - barHeight;


        const bar = (<rect x={barX} y={barY} width={CancerCellFractionColumnFormatter.barWidth} height={barHeight} fill={color}/>);

        const variantReadText:string = `${isUncalled(mutation.geneticProfileId)? "(uncalled) " : ""}(${ccf})`;

        const text = (<span><strong>{ccf.toFixed(2)}</strong> {variantReadText}</span>);
        return {
            sampleId:mutation.sampleId, bar, component:sampleComponent, text, ccf
        };
    }

    public static renderFunction(mutations:Mutation[], sampleManager:SampleManager|null) {
        if (!sampleManager) {
            return (<span></span>);
        }

        const sampleOrder = sampleManager.getSampleIdsInOrder();
        const barX = sampleOrder.reduce((map:{[s:string]:number}, sampleId:string, i:number) => {map[sampleId] = CancerCellFractionColumnFormatter.indexToBarLeft(i); return map;}, {});
        const sampleElements = mutations.map((m:Mutation) => {
            const args = CancerCellFractionColumnFormatter.getComponentForSampleArgs(m);
            return CancerCellFractionColumnFormatter.convertMutationToSampleElement(
                m,
                sampleManager.getColorForSample(m.sampleId),
                barX[m.sampleId],
                sampleManager.getComponentForSample(m.sampleId, args.opacity, args.extraTooltipText)
            );
        });
        const sampleToElements = sampleElements.reduce((map:{[s:string]:any}, elements:any) => {if (elements) { map[elements.sampleId] = elements } return map; }, {});
        const elementsInSampleOrder = sampleOrder.map((sampleId:string) => sampleToElements[sampleId]).filter((x:any) => !!x);
        const tooltipLines = elementsInSampleOrder.map((elements:any)=>(<span key={elements.sampleId}>{elements.component}  {elements.text}<br/></span>));
        const factions = sampleOrder.map((sampleId:string) => (sampleToElements[sampleId] && sampleToElements[sampleId].cancerCellFraction) || undefined);
        const bars = elementsInSampleOrder.map((elements:any)=>elements.bar);

        let content:JSX.Element = <span />;

        // single sample: just show the number
        if (sampleManager.samples.length === 1) {
            content = <span>{ (!isNaN(factions[0]) ? factions[0].toFixed(2) : '') }</span>;
        }
        // multiple samples: show a graphical component
        // (if no tooltip info available do not update content)
        else if (tooltipLines.length > 0) {
            content = (
                <svg
                    width={CancerCellFractionColumnFormatter.getSVGWidth(sampleOrder.length)}
                    height={CancerCellFractionColumnFormatter.maxBarHeight}
                >
                    {bars}
                </svg>
            );
        }

        // as long as we have tooltip lines, show tooltip in either cases (single or multiple)
        if (tooltipLines.length > 0)
        {
            const overlay = () => <span>{tooltipLines}</span>;

            content = (
                <DefaultTooltip
                    placement="left"
                    overlay={overlay}
                    arrowContent={<div className="rc-tooltip-arrow-inner"/>}
                    destroyTooltipOnHide={true}
                >
                    {content}
                </DefaultTooltip>
            );
        }

        return content;
    }

    public static getSVGWidth(numSamples:number) {
        return numSamples*CancerCellFractionColumnFormatter.barWidth + (numSamples-1)*CancerCellFractionColumnFormatter.barSpacing
    }

    public static getSortValue(d:Mutation[], sampleManager:SampleManager|null) {
        if (!sampleManager) {
            return [null];
        }

        // frequencies in sample order
        const sampleToMutation = d.reduce((map:{[s:string]:Mutation}, next:Mutation)=>{
            map[next.sampleId] = next;
            return map;
        }, {});
        return sampleManager.getSampleIdsInOrder().map(sampleId=>sampleToMutation[sampleId]).map(mutation=>{
            if (!mutation) {
                return null;
            }
            const ccf = mutation.cancerCellFraction;
            const refReads = mutation.tumorRefCount;
            if (ccf < 0) {
                return null;
            }
            return (ccf);
        });
    }

    public static isVisible(sampleManager:SampleManager|null, allMutations?: Mutation[][]): boolean {

        if (allMutations) {
            for (const rowMutations of allMutations) {
                const frequency = this.getSortValue(rowMutations, sampleManager);
                if (frequency[0]) {
                    return true;
                }
            }
        }

        return false;
    }
}
