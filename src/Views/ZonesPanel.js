import React from 'react';
import { NavLink } from "react-router-dom";

import ZoneItem from './Components/Zones/ZoneItem'
import UpdateForm from './Components/Zones/UpdateForm'

import LeafletMap from './Components/LeafletMap'
import store from '../Redux/Reducers/index'
import {loadZones} from '../Redux/Actions/index'

export default class ZonesPanel extends React.Component {

    constructor (props) {
        super(props);
        this.selectZone =  this.selectZone.bind(this);
        this.showSelectedZone = this.showSelectedZone.bind(this);
        this.hideZone =  this.hideZone.bind(this);
        this.updateZones = this.updateZones.bind(this);
        this.changeCenterMap =  this.changeCenterMap.bind(this);
        this.state = {
            zones : [],
            selectedZone : -1,
            showList: true,
            center : null 
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
        this.setState({center : location});
    } 

    selectZone (number) {
        this.setState({
            selectedZone :  number,
            showList: false,
            center : this.state.zones[number].centerPoint
        })
    }

    hideZone(){
        this.setState({ selectedZone : -1 , showList : true})
        this.updateZones(); 
    }
    
    updateZones () {
        fetch ("http://smartsecurity-webservice.herokuapp.com/api/zone?status=1")
        .then((result) => {
            return result.json();
        }).then((zones)=> {
            store.dispatch(loadZones(zones));
        })
    }

    showSelectedZone () {
        if (this.state.selectedZone > -1 ) {
            var zone = this.state.zones[this.state.selectedZone];
            return (
                <div className="col-md-12" >
                    <div className="card" id="mapcard">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-5">
                                    <UpdateForm 
                                        id={zone.idZone}
                                        name={zone.name}
                                        address={zone.address}
                                        description={zone.description}
                                        hideZone={this.hideZone}
                                        updateZones={this.updateZones}
                                        changeCenterMap={this.changeCenterMap}
                                    />
                                </div>
                                <div className="col-md-7">
                                    <LeafletMap 
                                        center={zone.centerPoint} 
                                        polylines={[zone]}
                                        currentCenter={this.state.center}
                                    />
                                </div>    
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        
    }

    render () {
        return (
            <div className="row" >
                <div className={this.state.showList ? "col-md-12" : "d-none"} >
                    <div className="card">
                    <div className="card-body">
                        <div className="table-responsive table-hover">
                        <table className="table">
                            <thead className=" text-primary">
                                <tr>
                                    <th>
                                        Name
                                    </th>
                                    <th>
                                        Address
                                    </th>
                                    <th className="text-center"> 
                                    <NavLink 
                                        exact 
                                        className="btn btn-sm btn-outline-primary btn-circle btn-icon card-category"  
                                        to="/places/zones/create"
                                    > 
                                        <i className="fa fa-plus"></i>
                                    </NavLink>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.zones.map((zone, index) => (
                                    <ZoneItem
                                        key={zone.idZone}
                                        id={zone.idZone}
                                        name={zone.name}
                                        address={zone.address}
                                        description={zone.description}
                                        selectZone={this.selectZone.bind(this)}
                                        index={index}
                                    />
                                )) 
                            }
                            </tbody>
                        </table>
                        </div>
                    </div>
                    </div>
                </div>
                {this.showSelectedZone()}
            </div>
        )
    }
}




