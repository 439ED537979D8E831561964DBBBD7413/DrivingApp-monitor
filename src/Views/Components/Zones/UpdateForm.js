import React from 'react'
import LeafletMap from '../LeafletMap'


export default class UpdateForm extends React.Component {
    constructor (props){
        super(props);
        this.handleChange= this.handleChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleSubmit =  this.handleSubmit.bind(this);
        this.handleChangeAddress = this.handleChangeAddress.bind(this);
        this.state = {
            name : "",
            address : "",
            description : ""
        }
    }

    componentDidMount(){
        this.setState({
            name :  this.props.name,
            address : this.props.address,
            description : this.props.description
        })
    }

    componentWillReceiveProps(newProps){
        //this.addresRef = React
        this.setState({
            name :  newProps.name,
            address : newProps.address,
            description : newProps.description
        })
    }

    handleChange(event) {
        var newState = {};
        newState[event.target.name] = event.target.value;
        this.setState(newState);
    }

    handleChangeAddress (event) {
        let value  = event.target.value;

        fetch (`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(value)}&key=AIzaSyDCflB_l_yiXG9F29g65Q33boBrCJTepmM`) 
        .then((result) => {
            return result.json()
        })
        .then(data =>{
            if (data.results.length > 0){
            console.log(data.results[0].geometry.location)
            this.props.changeCenterMap([data.results[0].geometry.location.lat,data.results[0].geometry.location.lng]);
            }
            else
            console.log("No se enecotraoron")
        })
    
        this.setState({address :  value})
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch(`http://smartsecurity-webservice.herokuapp.com/api/zone/${this.props.id}`,  {
            method : "PUT",
            body: JSON.stringify({...this.state, owner: this.state.name}),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then((result)=> {
            if (result.status >= 200 && result.status <= 208 ){
                console.log(result.status , "UPDATE")
                this.showNotification('top','right', "The zone has been updated ", "success");
                this.props.updateZones();
                this.props.hideZone();

            }else{
                console.log("Ocirrió un error mientras se actualizaba elemento")
            } 
        }) 
    }

    handleDelete() {
        let t = this;
        fetch(`http://smartsecurity-webservice.herokuapp.com/api/zone/${this.props.id}`, {method : "DELETE"})
        .then((result) =>{
            if (result.status >= 200 && result.status <= 208 ){
                t.props.hideZone();
            }else{
                console.log("Ocirrió un error mientras se elminaba elemento")
            }
        })
    }

    showNotification(from, align, text, type){
        window.$.notify({
            message: text
          },{
              type: type,
              timer: 4000,
              placement: {
                  from: from,
                  align: align
              }
          });
    }

    render () {
        return (
            <form id="form" onSubmit={this.handleSubmit}>
                <div className="row">
                    <div className="col-md-5">
                        <div className="form-group">
                            <label htmlFor="zoneName">  Name: </label>
                            <input type="text" name="name" onChange={this.handleChange} value={this.state.name} className="form-control text-center" required />
                        </div>
                        <div className="form-group basic-textarea">
                            <label htmlFor="zoneDescription"> Description: </label>
                            <textarea className="form-control text-center" onChange={this.handleChange} name="description" value={this.state.description} placeholder="Brief description of the zone" required rows="2"></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="zoneAddress"> 
                                Address:
                            </label>
                            <textarea className="form-control text-center is-invalid " onChange={this.handleChangeAddress} name="address" value={this.state.address} placeholder="Insert the address of the zone" required rows="2"></textarea>
                        </div>
                    </div>
                    <div className="col-md-7">
                        <div className="input-group">
                            <LeafletMap 
                                center={this.props.center} 
                                zoom={17}
                                polylines={[this.props.zone]}
                            />
                        </div>
                        
                        
                    </div>  
                </div>
                
            </form>
            
        )
    }
}