import React from "react"
import store from '../Redux/Reducers/index'
import UpdateForm from './Components/Zones/UpdateForm'


export default class ShowZone extends React.Component {
    constructor (props) {
        super(props);
        this.getZone =  this.getZone.bind(this);
        this.state = {
            zone : null
        }
        this.subs = store.subscribe(() => {
            this.getZone(this.props.match.params.id);
        })
    }
    componentDidMount () {
        this.getZone(this.props.match.params.id);
    }

    componentWillReceiveProps(nextProps){
        this.getZone(nextProps.match.params.id)
    }

    componentWillUnmount() {
        this.subs();
    }
    getZone(id) {
        try {

            let zones = store.getState().zonesData;
            let zone  =  zones[id];
            this.setState({zone});
        }catch(err){console.log(err)}
    }
    render() {
        return(
            <div className="col-md-12" >
                <div className="card"  id="mapcard">
                    <div className="card-body">
                        {this.state.zone ? 
                        <UpdateForm 
                            id={this.state.zone.idZone}
                            name={this.state.zone.name}
                            address={this.state.zone.address}
                            description={this.state.zone.description}
                            center={this.state.zone.centerPoint}
                            zone={this.state.zone}
                        /> 
                        : <div></div>}
                    </div>
                </div>
            </div>
        )
        
    }
}