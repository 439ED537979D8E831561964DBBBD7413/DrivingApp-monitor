import React from 'react';

import ZoneItem from './Components/Zones/ZoneItem'

import LeafletMap from './Components/LeafletMap'
import store from '../Redux/Reducers/index'
import {loadZones} from '../Redux/Actions/index'

export default class ZonesPanel extends React.Component {

    constructor (props) {
        super(props);
        this.selectZone =  this.selectZone.bind(this);
        this.updateZones = this.updateZones.bind(this);
        this.changeCenterMap =  this.changeCenterMap.bind(this);
        this.state = {
            zones : [],
            selectedZone : -1,
            showList: true,
            zoom : 2,
            center : [0,0]
        }
        let t = this;
        this.subs = store.subscribe(() => {
            t.getZones()
        })
    }
    componentDidMount () {
        this.getZones();
    }

    getZones() {
        try {
            let zones = store.getState().zonesData;
            this.setState({zones});
        }catch(err){console.log(err)}
    }

    changeCenterMap (location) {
        this.setState({center : location, zoom : 2});
    } 

    selectZone (number) {
        this.setState({
            selectedZone :  number,
            zoom: 17,
            center : this.state.zones[number].centerPoint
        })
    }

    updateZones () {
        fetch ("http://smartsecurity-webservice.herokuapp.com/api/zone?status=1")
        .then((result) => {
            return result.json();
        }).then((zones)=> {
            store.dispatch(loadZones(zones));
        })
    }

    componentWillUnmount () {
        this.subs();
    }
    

    render () {
        return (
            <div className="row" >
                <div className={this.state.showList ? "col-md-12" : "d-none"} >
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-5">
                                    <div className="list-group" style={{height: "650px", overflowY: "scroll"}}>
                                        {
                                            this.state.zones.map((zone, index) => (
                                                <ZoneItem  
                                                    key={index}
                                                    idZone={zone.idZone}
                                                    name={zone.name}
                                                    index={index}
                                                    address={zone.address}
                                                    description={zone.description}
                                                    selectZone={this.selectZone}
                                                    updateZones={this.updateZones}
                                                    changeCenterMap={this.changeCenterMap}
                                                />
                                            ))
                                        }
                                    </div>
                                </div>
                                 <div className="col-md-7">
                                    <LeafletMap 
                                        center={[0,0]}
                                        currentCenter={this.state.center} 
                                        zoom ={ this.state.zoom }
                                        polylines={this.state.zones}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}




