import CancerCellFractionColumnFormatter from './CancerCellFractionColumnFormatter';
import {GENETIC_PROFILE_UNCALLED_MUTATIONS_SUFFIX, GENETIC_PROFILE_MUTATIONS_SUFFIX} from '../../../../shared/constants';
import React from 'react';
import { assert } from 'chai';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';

describe('CancerCellFractionColumnFormatter', () => {

    before(()=> {

    });

    after(()=> {

    });

    it('uncalled mutations component w/o reads should have 0 opacity', ()=> {
        const uncalledMutationWithoutSupport = {
            geneticProfileId:`study_${GENETIC_PROFILE_UNCALLED_MUTATIONS_SUFFIX}`,
            cancerCellFraction:0
        };
        const res = CancerCellFractionColumnFormatter.getComponentForSampleArgs(uncalledMutationWithoutSupport);
        assert(res.opacity === 0);
    });
    it('uncalled mutations component w supporting reads should have >0 and <1 opacity', ()=> {
        const uncalledMutationWithSupport = {
            geneticProfileId:`study_${GENETIC_PROFILE_UNCALLED_MUTATIONS_SUFFIX}`,
            cancerCellFraction: 0
        };
        const res = CancerCellFractionColumnFormatter.getComponentForSampleArgs(uncalledMutationWithSupport);
        assert(res.opacity > 0 && res.opacity < 1);
    });
    it('called mutations component w supporting reads should have 1 opacity', ()=> {
        const calledMutation = {
            geneticProfileId:`study_${GENETIC_PROFILE_MUTATIONS_SUFFIX}`,
            cancerCellFraction: 0
        };
        const res = CancerCellFractionColumnFormatter.getComponentForSampleArgs(calledMutation);
        assert(res.opacity === 1);
    });
    it('sampleElement should have the text (uncalled)', ()=> {
        const uncalledMutationWithSupport = {
            sampleId:'1',
            geneticProfileId:`study_${GENETIC_PROFILE_UNCALLED_MUTATIONS_SUFFIX}`,
            cancerCellFraction: 0
        };
        const res = CancerCellFractionColumnFormatter.convertMutationToSampleElement(uncalledMutationWithSupport, 'red', 5, {});
        assert(res && mount(res.text).text().indexOf('(uncalled)') !== -1);
    });
});
