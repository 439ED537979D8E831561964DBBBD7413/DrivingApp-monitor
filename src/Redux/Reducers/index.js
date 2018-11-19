import { createStore} from 'redux';

var initialState = {
    categoryAlerts : {},
    severityAlerts : {},
    zoneAlerts : {},
    zoneAlertsData : [],
    zonesData : []
}


var alerts = (state = initialState, action) => {
    switch (action.type) {
        case 'LOAD_CATEGORY_ALERTS':
            return { ...state, categoryAlerts: action.data}
        case 'LOAD_SEVERITY_ALERTS':
        return { ...state, severityAlerts: action.data}
        case 'LOAD_ZONE_ALERTS':
            for (let zone in action.data ){
                action.data[zone].location = convertPolygon(action.data[zone].location);
            }
            return { ...state, zoneAlerts: action.data}
        case 'LOAD_ZONE_ALERTS_DATA':
            var id  = action.id;
            var data = action.data;
            for (let alert in data){
                data[alert].location = convertCoords(data[alert].location);
            }
            return { ...state, zoneAlertsData: [...state.zoneAlertsData, { id, data }]}
        case 'LOAD_ZONES_DATA':
            return { ...state, zonesData: action.data}
        default : 
            return state
    }
}

function convertPolygon (polygon) {
    let tempLocation = []
    for (let coords in polygon){
        let newcoords = {
            lat : polygon[coords][0],
            lng : polygon[coords][1]
        }
        tempLocation.push(newcoords)
    }
    return tempLocation
}

function convertCoords (original) {
    let array = original.split(",");
    return {
        lat: Number(array[0]), 
        lng :Number(array[1])
    }
}

export default createStore(alerts, initialState);

