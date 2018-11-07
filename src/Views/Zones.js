import React from 'react';
import ZoneItem from './Components/Zones/ZoneItem'

import LeafletMap from './Components/LeafletMap'

export default class Zones extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            zones : []
        }
    }
    componentDidMount () {
        let t = this;
        fetch ("http://smartsecurity-webservice.herokuapp.com/api/zone?status=1")
        .then((result) => {
            return result.json();
        }).then((zones)=> {
            t.setState({zones})
        })
    }
    render () {
        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                    <div className="card-header">
                        <h4 className="card-title"> Registered Zones</h4>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                        <table className="table table-hover table-sm" id="zoneList">
                            <thead className="thead-light">
                            <tr>
                                <th scope="col">
                                    ID
                                </th>
                                <th scope="col">
                                    Name
                                </th>
                                <th scope="col">
                                    Address
                                </th>
                                <th scope="col">
                                    Description
                                </th>
                                <th scope="col">
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                                {
                                   this.state.zones.map((zone) => (
                                       <ZoneItem
                                            key={zone.idZone}
                                            id={zone.idZone}
                                            name={zone.name}
                                            address={zone.address}
                                            description={zone.description}
                                       />
                                   )) 
                                }
                            </tbody>
                        </table>
                        </div>
                    </div>
                    </div>
                </div> 
                 <LeafletMap center={[19.3597191, -99.25841489999999]}/>
            </div>
        )
    }
}

