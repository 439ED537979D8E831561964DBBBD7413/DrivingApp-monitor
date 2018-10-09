import React from 'react';
import GoogleChart from '../../GoogleChart';
import store from '../../../../Redux/Reducers/index';


export default class ZoneAlerts extends React.Component {

    constructor (props) {
        super(props)
        this.getZoneAlerts = this.getZoneAlerts.bind(this);
        this.haveZoneAlerts = this.haveZoneAlerts.bind(this);
        this.state = {
            data : [],
            timeMessage : "Updated 30 seconds ago"
        }
        let t =  this;
        this.subs = store.subscribe(() => {
            t.getZoneAlerts();
        })
    }

    getZoneAlerts(){
        this.setState({data : store.getState().zoneAlerts});
    }

    componentWillMount () {
        this.getZoneAlerts();
    }

    componentWillUnmount() {
        this.subs();
    }

    haveZoneAlerts(){

        if(this.state.data.length > 0){
            return(
                <GoogleChart
                    title="Zone Alerts" 
                    is3D={false}
                    chartType="PieChart"
                    data={this.state.data} 
                    graph_id="zonealerts"
                    width={'100%'}
                    height={'500px'}
                />
            )
        }else {
            return (
                <div>
                    <div className="progress">
                        <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style={{width: '100%'}}></div>
                    </div>
                    Loading data...
                </div>
            )
        }

    }

    render() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="card ">
                    <div className="card-header ">
                        <h5 className="card-title">Alerts by Zone</h5>
                        <p className="card-category">Last day performance</p>
                    </div>
                    <div className="card-body" align="center">
                        {this.haveZoneAlerts()}
                    </div>
                    <div className="card-footer ">
                        <hr/>
                        <div className="stats">
                        <i className="fa fa-history"></i> {this.state.timeMessage}
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}