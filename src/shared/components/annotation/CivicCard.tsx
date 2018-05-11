import * as React from 'react';
import { If, Then, Else } from 'react-if';
import { ICivicVariantData } from "shared/model/Civic.ts";
import "./styles/phamacoCard.scss";
import * as _ from "lodash";

export interface ICivicCardProps {
    title: string;
    geneName: string;
    geneDescription: string;
    geneUrl: string;
    variants: { [name: string]: ICivicVariantData };
}

export default class CivicCard extends React.Component<ICivicCardProps, {}> {
    constructor() {
        super();
    }

    /**
     * Generate variants
     * @param variantMap
     * @returns {JSX.Element[]}
     */
    public generateVariants(variantMap: { [name: string]: ICivicVariantData }) {
        const list: JSX.Element[] = [];

        if (variantMap) {
            if (_.isEmpty(variantMap)) {
                list.push(this.variantItem());
            } else {
                for (let name in variantMap) {
                    let variant = variantMap[name];
                    let entryTypes: string = '';
                    for (let evidenceType in variant.evidence) {
                        entryTypes += evidenceType.toLowerCase() + ': ' + variant.evidence[evidenceType] + ', ';
                    }
                    entryTypes = entryTypes.slice(0, -2) + '.';

                    list.push(this.variantItem(variant.url, variant.name, entryTypes, variant.description));
                }
            }
        } else {
            list.push(this.variantItem());
        }

        return list;
    }

    /**
     * Get variant item
     * @param url
     * @param name
     * @param entryTypes
     * @param description
     * @returns {any}
     */
    public variantItem(url?: string, name?: string, entryTypes?: string, description?: string) {
        let result;

        if (url || name || entryTypes || description) {
            result = (
                <div className="civic-card-variant">
                    <div className="civic-card-variant-header">
                        <span className="civic-card-variant-name"><a href={url} target="_blank">{name}</a></span>
                        <span className="civic-card-variant-entry-types"> Entries: {entryTypes}</span>
                    </div>
                    <div className="civic-card-variant-description summary">{description}</div>
                </div>
            );
        } else {
            result = (
                <div className="civic-card-variant">
                    <div className="civic-card-variant-description summary">Information about the oncogenic activity of
                        this alteration is not yet available in CIViC.
                    </div>
                </div>
            );
        }

        return result;
    }

    /**
     * Render civic card component
     * @returns {any}
     */
    public render() {
        const imgWidth:number = 14;
        const imgHeight:number = 14;
        return (
            <div className="civic-card">
                    <div className="col s12 tip-header">
                        ERBB2 Amplification In Breast Invasive Ductal Carcinoma
                    </div>
                    <div className="col s12 civic-card-content">
                        <table className="table">
                            <caption>CP724714
                            <img src={require("./images/pill_logo.png")} width={imgWidth}
                                 height={imgHeight} className="civic-logo" />
                            </caption>
                        <tr>
                            <th>Level</th>
                            <th>Tissue</th>
                            <th>FWER Corrected</th>
                            <th>FDA Approved</th>
                            <th>In Clinical Trials</th>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Breast</td>
                            <td>0.02</td>
                            <td>No</td>
                            <td>No</td>
                        </tr>
                        </table>
                        <table className="table">
                            <caption>Lapatinib
                            <img src={require("./images/pill_logo.png")} width={imgWidth}
                                 height={imgHeight} className="civic-logo" />
                            </caption>
                        <tr>
                            <th>Level</th>
                            <th>Tissue</th>
                            <th>FWER Corrected</th>
                            <th>FDA Approved</th>
                            <th>In Clinical Trials</th>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>Solid</td>
                            <td>7.53e-32</td>
                            <td>Yes</td>
                            <td>Yes</td>
                        </tr>
                        </table>
                    </div>
                        <div className="item disclaimer">
                            <span>
                                Disclaimer: This resource is intended for purely research purposes.
                                It should not be used for emergencies or medical or professional advice.
                            </span>
                        </div>

                <div className="item footer">
                    Powered by <a href="https://pharmacodb.pmgenomics.ca/"> PhamacoDB</a>
                </div>
            </div>
        );
    }
}
