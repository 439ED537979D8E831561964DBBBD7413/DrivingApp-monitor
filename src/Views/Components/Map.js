import React from "react";
import L from "leaflet";

const style = {
  width: "10",
  height: "30"
};

class Map extends React.Component {
  componentDidMount() {
    
    this.map = L.map("map", {
      center: [19.432608, -99.133209],
      zoom: 9,
      layers: [
        /*L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="http://osm.org /copyright">OpenStreetMap</a> contributors'
        })*/
        L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
          maxZoom: 20,
          subdomains:['mt0','mt1','mt2','mt3']
      })
      ]
    });

    L.marker([51.5, -0.09]).addTo(this.map)
    .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
    .openPopup();

    this.layer = L.layerGroup().addTo(this.map);
  }
  
  render() {
    return <div id="map" style={style} />;
  }
}

export default Map;
