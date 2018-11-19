import React from "react";
import L from "leaflet";
import 'leaflet.gridlayer.googlemutant/Leaflet.GoogleMutant';

const style = {
  width: "10",
  height: "30"
};

class Map extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      polylines : []
    }
  }
  componentDidMount() {
    this.markerLayer = L.layerGroup()
    this.map = L.map("mapid", {fullscreenControl: true, layers: [this.markerLayer]}).setView(this.props.center, 18);

    var roadMutant = L.gridLayer.googleMutant({
        maxZoom: 22,
        type:'roadmap'
    }).addTo(this.map);

    var hybridMutant = L.gridLayer.googleMutant({
        maxZoom: 22,
        type:'hybrid'
    });
  
    L.control.layers({
        StreetsMap: roadMutant,
        SateliteMap: hybridMutant
    }, {}, {
        collapsed: false
    }).addTo(this.map);

    this.setState({polylines : this.props.polylines});
  }

  componentWillReceiveProps (prevProps){
    if (prevProps.center !== undefined){
      this.map.setView(new L.LatLng(prevProps.center[0],prevProps.center[1]), 16);
      this.markerLayer.clearLayers();
      this.map.removeLayer(this.markerLayer);
      this.markerLayer.addTo(this.map);
    }
    console.log(prevProps.currentCenter)
    if (prevProps.currentCenter !== undefined){
      this.map.panTo(new L.LatLng(prevProps.currentCenter[0],prevProps.currentCenter[1]));
    }
    this.setState({polylines: prevProps.polylines})
  } 
  
  render() {
    if (this.state.polylines.length > 0){
      this.state.polylines.map((zone) => {
        L.polyline(zone.location).addTo(this.markerLayer);
        return true;
      })
    }
    return <div id="mapid" style={style} />;
  }
}

export default Map;
