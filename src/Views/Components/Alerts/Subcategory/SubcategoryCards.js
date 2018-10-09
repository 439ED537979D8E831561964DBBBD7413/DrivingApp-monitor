import React from 'react';
import Card from '../../Card';

export default class SubcategoryCards extends React.Component { 

    constructor (props) {
        super(props);
        this.state = {
            trafficCount : 0,
            securityCount : 0,
            unknownCount : 0
        }
    }

    componentDidMount () {
        let t = this;
        fetch("http://localhost:8000/alerts/count/category")
        .then((result) => {
            return result.json()
        })
        .then(data => {
            t.setState({
                trafficCount : data[0][0],
                securityCount : data[1][0],
                unknownCount : data[2][0]
            });
        })
        .catch(console.log)
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