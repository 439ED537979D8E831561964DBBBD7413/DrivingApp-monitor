import React from 'react'
import LeafletMap from '../LeafletMap'


export default class UpdateForm extends React.Component {
    constructor (props){
        super(props);
        this.handleChange= this.handleChange.bind(this);
        this.handleSubmit =  this.handleSubmit.bind(this);
        this.mapCallBack = this.mapCallBack.bind(this);
        this.state = {
            id : "",
            name : "",
            address : "",
            description : "",
            center : [0,0]
        }
    }

    componentDidMount(){
        this.setState({
            id : this.props.id,
            name :  this.props.name,
            address : this.props.address,
            description : this.props.description,
            center : this.props.center
        })
    }

    componentWillReceiveProps(newProps){
        if (newProps.id !== this.state.id){
            this.setState({
                id : newProps.id,
                name :  newProps.name,
                address : newProps.address,
                description : newProps.description
            })
        }
        
    }

    handleChange(event) {
        var newState = {};
        newState[event.target.name] = event.target.value;
        this.setState(newState);
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

    mapCallBack (text) {
        this.setState({address : text})
    }

    render () {
        console.log(this.state.description)
        return (
            <form id="form" onSubmit={this.handleSubmit}>
                <div className="row">
                    <div className="col-md-12">
                        <div className="input-group">
                            <LeafletMap 
                                center={this.state.center} 
                                zoom={17}
                                polylines={[this.props.zone]}
                                name={this.state.name}
                                description={this.state.description}
                                address={this.state.address}
                                callback={this.mapCallBack}
                            />
                        </div>
                    </div>  
                </div>
                
            </form>
            
        )
    }
}