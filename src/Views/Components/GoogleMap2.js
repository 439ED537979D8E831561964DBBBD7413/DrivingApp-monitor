import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import React, { Component } from 'react';

const style = {
    width: '100%',
    height: '100%'
  }

export class MapContainer extends Component {
  render() {
    return (
      <Map style={style}
      google={this.props.google}
      initialCenter={{
        lat: 40.854885,
        lng: -88.081807
      }}
      zoom={15}
      onClick={this.onMapClicked}>
 
        <Marker 
                name={'Current location'} />
 
        <InfoWindow >
            <div>
              <h1>this.state.selectedPlace.name</h1>
            </div>
        </InfoWindow>
      </Map>
    );
  }
}
var YOUR_GOOGLE_API_KEY_GOES_HERE = "AIzaSyBKylGqXGF6dkieX9tcSsneA18xX-tAROw";
export default GoogleApiWrapper({
  apiKey: (YOUR_GOOGLE_API_KEY_GOES_HERE)
})(MapContainer);