import React from "react";
import { NavLink} from "react-router-dom";


export default class ZoneItem extends React.Component {
    constructor (props) {
        super(props);
        this.handleDelete =  this.handleDelete.bind(this);
        this.selectZone = this.selectZone.bind(this);
    } 

    selectZone () {
        this.props.selectZone(this.props.index)
    }

    handleDelete() {
        let t = this;
        console.log(this.props.idZone)
        fetch(`http://smartsecurity-webservice.herokuapp.com/api/zone/${this.props.idZone}`, {method : "DELETE"})
        .then((result) =>{
            if (result.status >= 200 && result.status <= 208 ){
                t.props.updateZones();
                t.props.changeCenterMap([0,0]);
            }else{
                console.log("Ocirrió un error mientras se elminaba elemento")
            }
        })
    }

    render () {
        return (
            <div className="list-group-item list-group-item-action flex-column align-items-start"> 
                <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">{this.props.name}</h5>
                    <small>
                        <i className="material-icons" style={{fontSize: 18}} onClick={this.selectZone}>
                            remove_red_eye
                        </i>
                        <NavLink 
                            exact 
                            replace
                            to={"/places/zones/show/" + this.props.index}
                        > 
                            <i className="material-icons" style={{fontSize: 18}}>
                                edit
                            </i>
                        </NavLink>
                        <i className="material-icons" style={{fontSize: 18}} onClick={this.handleDelete}>
                            delete
                        </i>
                    </small>
                </div>
                <p className="mb-1">{this.props.address}</p>
                <small>{this.props.description}</small>
            </div>
        )
    }
}