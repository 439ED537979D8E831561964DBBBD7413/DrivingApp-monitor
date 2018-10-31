import { createStore} from 'redux';

var initialState = {
    categoryAlerts : {},
    severityAlerts : {},
    zoneAlerts : {},
    zoneAlertsData : []  
}


var alerts = (state = initialState, action) => {
    switch (action.type) {
        case 'LOAD_CATEGORY_ALERTS':
            return { ...state, categoryAlerts: action.data}
        case 'LOAD_SEVERITY_ALERTS':
        return { ...state, severityAlerts: action.data}
        case 'LOAD_ZONE_ALERTS':
            return { ...state, zoneAlerts: action.data}
        case 'LOAD_ZONE_ALERTS_DATA':
            return { ...state, zoneAlertsData: action.data}
        default : 
            return state
    }
}

export default createStore(alerts, initialState);

