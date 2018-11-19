import React from 'react'

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
        console.log("montando")
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
                console.log(result.status , "DELETED")
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
                <div className="form-group row"> 
                    <div className="col-6">
                        <button className="btn btn-sm btn-success btn-round btn-icon" onClick={this.props.hideZone}><i className="fa fa-arrow-left"></i></button>
                        <button type="submit" className="btn btn-sm btn-primary btn-round btn-icon"><i className="fa fa-floppy-o"></i></button>
                        <button type="button" onClick={this.handleDelete} className="btn btn-sm btn-danger btn-round btn-icon"><i className="fa fa-trash"></i></button>
                    </div>
                </div>
                
                <div className="form-group">
                    <label htmlFor="zoneName">  Name: </label>
                    <input type="text" name="name" onChange={this.handleChange} value={this.state.name} className="form-control text-center" required />
                </div>
                <div className="form-group">
                    <label htmlFor="zoneAddress"> 
                        Address:
                    </label>
                    <textarea className="form-control text-center is-invalid " onChange={this.handleChangeAddress} name="address" value={this.state.address} placeholder="Insert the address of the zone" required rows="2"></textarea>
                </div>
                <div className="form-group basic-textarea">
                    <label htmlFor="zoneDescription"> Description: </label>
                    <textarea className="form-control text-center" onChange={this.handleChange} name="description" value={this.state.description} placeholder="Brief description of the zone" required rows="2"></textarea>
                </div>  
                
                
            </form>
        )
    }
}