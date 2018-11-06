import React, { Component } from 'react';
import { withGoogleMap , GoogleMap as GMap, Marker, Polyline} from 'react-google-maps';
import store from  '../../Redux/Reducers/index';
const { MarkerClusterer } = require("react-google-maps/lib/components/addons/MarkerClusterer");
const { DrawingManager } = require("react-google-maps/lib/components/drawing/DrawingManager");

const center = {
    lat : 19.432608, lng: -99.133209
}
const images = {
    accident : "https://github.com/cenidetiot/DrivingApp/raw/dev/app/src/main/res/drawable/accident.png",
    speeding : "https://github.com/cenidetiot/DrivingApp/raw/dev/app/src/main/res/drawable/speed_critical.png",
    traffic : "https://github.com/cenidetiot/DrivingApp/raw/dev/app/src/main/res/drawable/traffic_low.png",
}

class DrawMap extends Component {
    
   render() {
        const MapContainer = withGoogleMap(props => (
        <GMap
            defaultCenter = { center }
            defaultZoom = { 8 }
        >
             <DrawingManager
            defaultDrawingMode={'circle'}
            defaultOptions={{
                drawingControl: true,
                drawingControlOptions: {
                position: window.google.maps.ControlPosition.TOP_CENTER,
                drawingModes: ['marker', 'circle', 'polygon', 'polyline', 'rectangle'],
                },
                circleOptions: {
                fillColor: `#ffff00`,
                fillOpacity: 1,
                strokeWeight: 5,
                clickable: false,
                editable: true,
                zIndex: 1,
                },
            }}
            />
              
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
export default DrawMap;