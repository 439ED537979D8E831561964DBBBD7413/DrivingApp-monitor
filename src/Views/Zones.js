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
        console.log(this.state.zones)
        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                    <div className="card-header">
                        <h4 className="card-title"> Registered Zones</h4>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                        <table className="table table-hover" id="zoneList">
                            <thead className="thead-light">
                            <tr>
                                <th>
                                    ID
                                </th>
                                <th>
                                    Name
                                </th>
                                <th>
                                    Address
                                </th>
                                <th>
                                    Description
                                </th>
                                <th className="text-right">
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
                <LeafletMap />
            </div>
        )
    }
}

