import React from "react";
import L from "leaflet";
import 'leaflet.gridlayer.googlemutant/Leaflet.GoogleMutant';

const style = {
  width: "100%",
  height: "30",
  margin: 0,
  zIndex:0
  
};


class Map extends React.Component {
  constructor (props) {
    super(props);
    this.addControlSearch = this.addControlSearch.bind(this);
    this.changeView = this.changeView.bind(this);
    this.state = {
      polylines : [],
      center :  [0,0],
      currentCenter : [0,0]
    }
  }
  
  componentDidMount() {
    this.markerLayer = L.layerGroup()
    this.map = L.map("mapid", {fullscreenControl: true, layers: [this.markerLayer]}).setView(this.props.center, this.props.zoom);

    
    var roadMutant = L.gridLayer.googleMutant({
      maxZoom: 22,
      type:'roadmap'
    }).addTo(this.map);

    var hybridMutant = L.gridLayer.googleMutant({
        maxZoom: 22,
        type:'hybrid'
    });


    if (this.props.address !== undefined) {
      this.addControlSearch(this.props.address);
    }

    L.control.layers({
        StreetsMap: roadMutant,
        SateliteMap: hybridMutant
    }, {}, {
        collapsed: false
    }).addTo(this.map);

  }

  handleChangeAddress (value) {
      fetch (`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(value)}&key=AIzaSyDCflB_l_yiXG9F29g65Q33boBrCJTepmM`) 
      .then((result) => {
          return result.json()
      })
      .then(data =>{
          if (data.results.length > 0){
              var location = data.results[0].geometry.location;
              this.changeView([location.lat, location.lng],17)
          }
          else
          console.log("No se enecotraoron")
      })

      this.setState({address :  value})
  }

  addControlSearch (address) {
    let t = this;
    if (this.search !== undefined){
      this.map.removeControl(this.search)
    }
    var Search = L.Control.extend({
      onAdd: function(map) {

        var container = L.DomUtil.create('div', 'container card');
        this.form = L.DomUtil.create('form', 'form', container);

        var name = L.DomUtil.create('div', "form-group", this.form);
        var nameLabel = L.DomUtil.create("label", "", name);
        nameLabel.for="zoneName";
        nameLabel.innerHTML = "Name:";
        this.name = L.DomUtil.create('input', "form-control text-center", name);
        this.name.value = t.props.name; 
        this.name.required = true;

        var description = L.DomUtil.create('div', "form-group basic-textarea", this.form);
        var nameLabel = L.DomUtil.create("label", "", name);
        nameLabel.for="zoneDescription";
        nameLabel.innerHTML = "Description:";
        this.description = L.DomUtil.create('textarea', 'form-control text-center', description);
        this.description.placeholder="Brief description of the zone";
        this.description.value = t.props.description;
        this.description.required =  true;
        this.description.rows = "2";        
        
        
        var group = L.DomUtil.create('div', 'input-group', this.form);
        this.textArea = L.DomUtil.create('textarea', 'form-control', group);
        this.textArea.value = address;
        this.textArea.placeholder = "Search";
        var prepend = L.DomUtil.create('div', 'input-group-append', group);
        this.button = L.DomUtil.create('button', 'btn btn-success btn-round btn-icon', prepend);
        this.button.innerHTML = '<i class="fa fa-search"></i>';
        this.button.style = "margin : 0";

        L.DomEvent.addListener(this.button, 'click', this.click, this);
        L.DomEvent.addListener(this.form, 'submit', this.submit, this);
        return container;
      },
      submit: function(e) {
        L.DomEvent.preventDefault(e);
      },
      click : function (e){
        t.handleChangeAddress(this.textArea.value)
        t.props.callback(this.textArea.value);
      }
  });
  
  this.search = new Search({ position: 'bottomleft' })
  this.map.addControl(this.search);
  }

  changeView (center, zoom) {
    this.setState({center})
    this.map.setView(new L.LatLng(center[0],center[1]),zoom);
    this.markerLayer.addTo(this.map);
  }

  componentWillReceiveProps (prevProps){
    if (prevProps.center !== undefined){
      if (prevProps.center[0] !== this.state.center[0] && prevProps.center[1] !== this.state.center[1]) {
        this.markerLayer.clearLayers();
        this.map.removeLayer(this.markerLayer);
        this.changeView(prevProps.center, prevProps.zoom)
      }
    }
    if (prevProps.polylines !== undefined && this.state.polylines.length < 1)
      this.setState({polylines: prevProps.polylines})
    
    if (prevProps.address !== undefined) {
      if (prevProps.address !== this.state.address)
        this.addControlSearch(prevProps.address);
    }

  } 
  
  render() {
    if (this.state.polylines.length > 0){
      this.state.polylines.map((zone) => {
        L.polyline(zone.location).addTo(this.markerLayer);
        return true;
      })
    }
    return (<div id="mapid" style={style}></div> );
  }
}

export default Map;
