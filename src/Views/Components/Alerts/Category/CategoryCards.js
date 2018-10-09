import React from 'react';
import Card from '../../Card';
import store from '../../../../Redux/Reducers/index';

export default class CategoryCards extends React.Component { 

    constructor (props) {
        super(props);
        this.getCategoryAlerts =  this.getCategoryAlerts.bind(this);
        this.state = {
            trafficCount : 0,
            securityCount : 0,
            unknownCount : 0
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
            let tempState = {
                trafficCount : categoryAlerts[0][0],
                securityCount : categoryAlerts[1][0],
                unknownCount : categoryAlerts[2][0]
            }
            this.setState(tempState);
        }catch(err){
            //console.error(err)
        }
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
                        count={this.state.trafficCount} 
                        time="Few minutes ago"
                    />
                </div>
                <div className="col-lg-4 col-md-4 col-sm-6">
                    <Card 
                        iconColor="success" 
                        icon="verified_user" 
                        title="Security Alerts" 
                        count={this.state.securityCount} 
                        time="Few minutes ago"
                    />
                </div>
                <div className="col-lg-4 col-md-4 col-sm-6">
                    <Card 
                        iconColor="danger" 
                        icon="warning" 
                        title="Unknown Alerts" 
                        count={this.state.unknownCount} 
                        time="Few minutes ago"
                    />
                </div>
            </div>
        )
    }
}