import React, { Component } from 'react';
import store from  '../../Redux/Reducers/index';
import car from '../Images/accident_critical.png'

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
            zones : [],
            zonesid: {}
        }
        
    }
    componentDidMount (){
        this.getZoneAlerts();
        this.subs = store.subscribe( async () => {
            this.getZoneAlerts();
        })
    }

    async getZoneAlerts (){
        try {
            var zones = [];
            if (this.state.zones.length < 1) {
                for (let zone in store.getState().zoneAlerts){
                    var tempZone =  store.getState().zoneAlerts[zone];
                    await fetch (`https://drivingapp-monitor-back.herokuapp.com/alerts/all/zone/${zone}`)
                    .then((result) =>{return result.json();})
                    .then((alerts) =>{
                        for (let a in alerts){
                            alerts[a].location = alerts[a].location.split(",");
                        }
                        tempZone.alerts = alerts;
                        zones.push(tempZone)
                    })
                }
                this.setState({
                    zones , zonesid : store.getState().zoneAlerts
                })
            }
        }catch(e){
            console.log(e)
        }
    }

   render() {

        var zones = [];
        if (this.state.zones.length > 0){

            for (let zone in this.state.zones) {
                var tempZone =  this.state.zones[zone];
                var tempCoords = [];
                for (let coords  in tempZone.location) {
                    tempCoords.push({
                        lat : tempZone.location[coords][0],
                        lng: tempZone.location[coords][1]
                    })
                }
                tempZone.location = tempCoords;
                zones.push(tempZone);
            }

            
        }
       
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
                                position={{lat : Number(alert.location[0]), lng : Number(alert.location[1])}}
                            />
                        ))
                                
                    }
                    </MarkerClusterer>
                ))
            }

            {
                zones.map((zone ,i ) => (
                    <Polyline 
                        key={i}
                        path={zone.location}
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