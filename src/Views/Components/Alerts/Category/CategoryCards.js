import React from 'react';
import Card from '../../Card';
import store from '../../../../Redux/Reducers/index';

export default class CategoryCards extends React.Component { 

    constructor (props) {
        super(props);
        this.getCategoryAlerts =  this.getCategoryAlerts.bind(this);
        this.state = {
            traffic : 0,
            security : 0,
            unknownAlert : 0
        }
        
        let t = this;
        this.subs = store.subscribe(() => {
            t.getCategoryAlerts();
        })
    }

    componentWillMount (){
        this.getCategoryAlerts()
    }

    getCategoryAlerts(){
        try {
            let categoryAlerts = store.getState().categoryAlerts;
            this.setState(categoryAlerts);
        }catch(err){console.log(err)}
    }

    componentWillUnmount(){
        this.subs();
    }

    render () {
        return (
            <div className="row">
                <div className="col-lg-4 col-md-4 col-sm-6">
                    <Card 
                        iconColor="warning" 
                        icon="traffic" 
                        title="Traffic Alerts" 
                        count={this.state.traffic} 
                        time="Few minutes ago"
                    />
                </div>
                <div className="col-lg-4 col-md-4 col-sm-6">
                    <Card 
                        iconColor="success" 
                        icon="verified_user" 
                        title="Security Alerts" 
                        count={this.state.security} 
                        time="Few minutes ago"
                    />
                </div>
                <div className="col-lg-4 col-md-4 col-sm-6">
                    <Card 
                        iconColor="danger" 
                        icon="warning" 
                        title="Unknown Alerts" 
                        count={this.state.unknownAlert} 
                        time="Few minutes ago"
                    />
                </div>
            </div>
        )
    }
}