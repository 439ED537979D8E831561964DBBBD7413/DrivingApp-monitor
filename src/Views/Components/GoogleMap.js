import React, { Component } from 'react';
import { withGoogleMap , GoogleMap as GMap, Marker, Polyline} from 'react-google-maps';
import store from  '../../Redux/Reducers/index';
const { MarkerClusterer } = require("react-google-maps/lib/components/addons/MarkerClusterer");
const center = {
    lat : 19.432608, lng: -99.133209
}
const images = {
    accident : "https://github.com/cenidetiot/DrivingApp/raw/dev/app/src/main/res/drawable/accident.png",
    speeding : "https://github.com/cenidetiot/DrivingApp/raw/dev/app/src/main/res/drawable/speed_critical.png",
    traffic : "https://github.com/cenidetiot/DrivingApp/raw/dev/app/src/main/res/drawable/traffic_low.png",
}

class Map extends Component {
    constructor (props) {
        super(props);
        this.getZones = this.getZones.bind(this);
        this.loadAlerts =  this.loadAlerts.bind(this);
        this.state = {
            zones : [],
            alerts : [],
            alertsLoaded : false
        }
        let t = this;
        this.subs = store.subscribe( async () => {
            t.getAlerts();
        })
    }
    componentDidMount (){
        this.getAlerts();

    }

    componentWillUnmount() {
        this.subs();
    }

    async getZones (){
        try {
            var zones = [];
            for (let zone in store.getState().zoneAlerts){
                var tempZone =  store.getState().zoneAlerts[zone];
                zones.push(tempZone);
                
            }
            this.setState({
                zones
            })
            
        }catch(e){}
    }

    getAlerts () {
        try {

            var zones = [];
            for (let zone in store.getState().zoneAlerts){
                var tempZone =  store.getState().zoneAlerts[zone];
                zones.push(tempZone);
                
            }
            if (zones.length === store.getState().zoneAlertsData.length && (zones.length > 0 && store.getState().zoneAlertsData.length > 0) && !this.state.alertsLoaded) {
                
                var newState = {
                    alerts : store.getState().zoneAlertsData,
                    zones: zones,
                    alertsLoaded : true
                }
                this.setState(newState)
            
            }
            
            
        }catch(e){}
    }
    
    convertPolygon (polygon) {
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

    convertCoords (original) {
        let array = original.split(",");
        return {
            lat: Number(array[0]), 
            lng :Number(array[1])
        }
    }

    loadAlerts () {

        if (this.state.alertsLoaded) {
            return (
            <div>
                {
                    this.state.alerts.map((zone,j) => (
                        <MarkerClusterer
                            averageCenter
                            enableRetinaIcons
                            gridSize={100}
                            onClick={(markerClusterer) => {
                              }}
                            key={j}
                        >
                        {
                            zone.data.map((alert,i) => (
                                <Marker
                                    key={i}
                                    options={{icon: {url : images.accident, scaledSize: new window.google.maps.Size(60, 62)}}}
                                    position={alert.location}
                                >
                                </Marker>
                            )) 
                        }
                        </MarkerClusterer>
                    ))
                } 

                {
                    this.state.zones.map((zone ,i ) => (
                        <Polyline 
                            key={i}
                            path={zone.location}
                            options={{strokeColor: '#2980b9'}}
                        ></Polyline>
                    ))
                } 
            </div>
            )
        }
    }
    

   render() {
        const MapContainer = withGoogleMap(props => (
        <GMap
            defaultCenter = { center }
            defaultZoom = { 8 }
        >
            {this.loadAlerts()}   
              
        </GMap>
   ));

   return(
      <div>
        <MapContainer
          containerElement={ <div style={{ height: `650px`, width: '100%' }} /> }
          mapElement={ <div style={{ height: `95%` }} /> }
        />
      </div>
   );
   }
};
export default Map;