import { createStore} from 'redux';

var initialState = {
    
    categoryAlerts : [],
    severityAlerts : [],
    zoneAlerts : []

  
}


var alerts = (state = initialState, action) => {
    switch (action.type) {
        case 'LOAD_CATEGORY_ALERTS':
            //console.log(1)
            return { ...state, categoryAlerts: action.data}
        case 'LOAD_SEVERITY_ALERTS':
            //console.log(2)
            
        return { ...state, severityAlerts: action.data}
        case 'LOAD_ZONE_ALERTS':
            //console.log(3)

            return { ...state, zoneAlerts: action.data}
        default : 
            //console.log(4)
            
            return state
    }
}

export default createStore(alerts, initialState);

