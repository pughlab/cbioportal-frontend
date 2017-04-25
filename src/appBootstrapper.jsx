import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { hashHistory, createMemoryHistory, Router } from 'react-router';
import { RouterStore, syncHistoryWithStore  } from 'mobx-react-router';
import ExtendedRoutingStore from './shared/lib/ExtendedRouterStore';
import { computed, extendObservable } from 'mobx';
import makeRoutes from './routes';
import lodash from 'lodash';
import $ from 'jquery';
import URL from 'url';

// make sure lodash doesn't overwrite (or set) global underscore
lodash.noConflict();

const routingStore = new ExtendedRoutingStore();

//sometimes we need to use memory history where there would be a conflict with
//existing use of url hashfragment
const history = (window.historyType === 'memory') ? createMemoryHistory() : hashHistory;

const stores = {
    // Key can be whatever you want
    routing: routingStore,
    // ...other stores
};

const syncedHistory = syncHistoryWithStore(history, routingStore);


const qs = URL.parse(window.location.href, true).query;

const newParams = {};
if ('cancer_study_id' in qs) {
    newParams['studyId'] = qs.cancer_study_id;
}
if ('case_id' in qs) {
    newParams['caseId'] = qs.case_id;
}

if ('sample_id' in qs) {
    newParams['sampleId'] = qs.sample_id;
}

const navCaseIdsMatch = routingStore.location.pathname.match(/(nav_case_ids)=(.*)$/);
if (navCaseIdsMatch && navCaseIdsMatch.length > 2) {
    newParams['navCaseIds'] = navCaseIdsMatch[2];
}

routingStore.updateRoute(newParams);


window.routingStore = routingStore;


let render = () => {

    const rootNode = document.getElementById("reactRoot");

    ReactDOM.render(
        <Provider {...stores}>
            <Router
                history={syncedHistory} routes={makeRoutes()} >
            </Router>
        </Provider>
    , rootNode);


};

if (__DEBUG__ && module.hot) {
    const renderApp = render;
    render = () => renderApp(Math.random());

    module.hot.accept('./routes', () => render());
}

$(document).ready(()=>render());
