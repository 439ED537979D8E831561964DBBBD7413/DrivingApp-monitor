

export const loadCategoryAlerts = (data) =>{
    return (
        { 
            type: 'LOAD_CATEGORY_ALERTS', 
            data
        }
        
    );
} 

export const loadSeverityAlerts = (data) =>{
    return (
        { 
            type: 'LOAD_SEVERITY_ALERTS', 
            data
        }
        
    );
} 

export const loadZoneAlerts = (data) =>{
    return (
        { 
            type: 'LOAD_ZONE_ALERTS', 
            data
        }
        
    );
} 

export const loadAlertsZoneData = (id, data) =>{
    return (
        { 
            type: 'LOAD_ZONE_ALERTS_DATA', 
            id,
            data
        }
        
    );
} 