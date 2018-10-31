import React, { Component } from 'react';
import store from  '../../Redux/Reducers/index';

import { withGoogleMap, GoogleMap, Marker, Polyline} from 'react-google-maps';

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
        this.getZoneAlerts = this.getZoneAlerts.bind(this);
        this.state = {
            zones : []
        }
        let t = this;
        this.subs = store.subscribe( async () => {
            t.getZoneAlerts();
        })
    }
    componentDidMount (){
        this.getZoneAlerts();
        
    }

    async getZoneAlerts (){
        try {
            var zones = [];
            for (let zone in store.getState().zoneAlerts){
                var tempZone =  store.getState().zoneAlerts[zone];
                zones.push(tempZone);
            }
            this.setState({
                zones
            })
            
        }catch(e){
        }
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
    

   render() {

        
       
        const GoogleMapExample = withGoogleMap(props => (
        <GoogleMap
            defaultCenter = { center }
            defaultZoom = { 8 }
        >
            {
                this.state.zones.map((zone,j) => (
                    <MarkerClusterer
                        averageCenter
                        enableRetinaIcons
                        gridSize={80}
                        onClick={(markerClusterer) => {
                          }}
                        key={j}
                    >
                    {
                        zone.alerts.map((alert,i) => (
                            <Marker
                                key={i}
                                options={{icon: {url : images.accident, scaledSize: new window.google.maps.Size(60, 62)}}}
                                position={this.convertCoords(alert.location)}
                            />
                        ))   
                    }
                    </MarkerClusterer>
                ))
            }

            {
                this.state.zones.map((zone ,i ) => (
                    <Polyline 
                        key={i}
                        path={this.convertPolygon(zone.location)}
                        options={{strokeColor: '#2980b9'}}
                    ></Polyline>
                ))
            }


            
        </GoogleMap>
   ));

   return(
      <div>
        <GoogleMapExample
          containerElement={ <div style={{ height: `650px`, width: '100%' }} /> }
          mapElement={ <div style={{ height: `95%` }} /> }
        />
      </div>
   );
   }
};
export default Map;