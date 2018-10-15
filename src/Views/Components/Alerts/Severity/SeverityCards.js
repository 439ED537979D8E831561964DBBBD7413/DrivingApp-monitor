import React from 'react';
import Card from '../../Card';
import store from '../../../../Redux/Reducers/index';


export default class SeverityCards extends React.Component { 

    constructor (props) {
        super(props);
        this.getSeverityAlerts = this.getSeverityAlerts.bind(this);
        this.state = {
            high: 0,
            medium: 0,
            critical: 0,
            informational: 0,
            low: 0,
        }
        let t = this;
        this.subs = store.subscribe(() => {
           t.getSeverityAlerts();
        })
    }

    getSeverityAlerts() {
        try {
            let severityAlerts = store.getState().severityAlerts;
            this.setState(severityAlerts);
        }catch(err){
            console.log(err)
        }
    }

    componentWillMount() {
        this.getSeverityAlerts();
    }

    componentWillUnmount(){
        this.subs();
    }

    render () {
        return (
            <div className="row">
                <div className="col-lg-4 col-md-4 col-sm-6">
                    <Card 
                        colorCode="#3498db"  
                        icon="warning" 
                        title="Informational Alerts" 
                        count={this.state.low} 
                        time="Few minutes ago"
                    />
                </div>
                <div className="col-lg-4 col-md-4 col-sm-6">
                    <Card 
                        colorCode="#34495e" 
                        icon="warning" 
                        title="Low Alerts" 
                        count={this.state.informational} 
                        time="Few minutes ago"
                    />
                </div>
                <div className="col-lg-4 col-md-4 col-sm-6">
                    <Card 
                        colorCode="#f1c40f" 
                        icon="warning" 
                        title="Medium Alerts" 
                        count={this.state.medium} 
                        time="Few minutes ago"
                    />
                </div>
                <div className="col-lg-4 col-md-4 col-sm-6">
                    <Card 
                        colorCode="#e67e22" 
                        icon="warning" 
                        title="High Alerts" 
                        count={this.state.high} 
                        time="Few minutes ago"
                    />
                </div>
                <div className="col-lg-4 col-md-4 col-sm-6">
                    <Card 
                        colorCode="#e74c3c" 
                        icon="warning" 
                        title="Critical Alerts" 
                        count={this.state.critical} 
                        time="Few minutes ago"
                    />
                </div>
            </div>
        )
    }
}