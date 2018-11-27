import React from 'react';
import SideBar from "./Views/Components/SideBar"
import Nav from "./Views/Components/Nav"
import Footer from './Views/Components/Footer'
import Alerts from "./Views/Alerts"
import Awards from "./Views/Awards"
import Map from './Views/Components/GoogleMap'
import Search from './Views/Search'
import Zones from './Views/Zones'
import { HashRouter  as Router, Route, Switch} from "react-router-dom";
import { 
    loadCategoryAlerts,
    loadSeverityAlerts,
    loadZoneAlerts,
    loadAlertsZoneData, 
    loadZones
} from './Redux/Actions/index';
import store from './Redux/Reducers/index'

import io from 'socket.io-client';

export default class App extends React.Component {
    constructor (props){
      super(props);
      this.getAlertsCategory = this.getAlertsCategory.bind(this);
      this.getAlertsSeverity = this.getAlertsSeverity.bind(this);
      this.getAlertsZone = this.getAlertsZone.bind(this);
      this.socket = io.connect(`https://drivingapp-monitor-back.herokuapp.com/`)//, { transports: ['websocket'] });
      this.state = {
          chanel : "",
          interval : null,
          alertsLoaded : false
      }
      
  }

  getAlertsCategory () {
      fetch("https://drivingapp-monitor-back.herokuapp.com/alerts/count/category")
      .then((result) => {
          return result.json()
      })
      .then(data => {
          store.dispatch(loadCategoryAlerts(data))
      })
      .catch(console.log)
  }

  getAlertsSeverity () {
      fetch("https://drivingapp-monitor-back.herokuapp.com/alerts/count/severity")
      .then((result) => {
          return result.json()
      })
      .then(data => {
          store.dispatch(loadSeverityAlerts(data))         
      })
      .catch(console.log)
  }

  getAlertsZone () {
      let t = this;
      fetch("https://drivingapp-monitor-back.herokuapp.com/alerts/count/zone")
      .then((result) => {
          return result.json();
      })
      .then(data =>{
            for (let zone in data){
                t.getAllAlertsZone(zone)
            }
            store.dispatch(loadZoneAlerts(data))
      })
      .catch(console.log)

      var interval = setInterval(() => {
          fetch("https://drivingapp-monitor-back.herokuapp.com/alerts/count/zone")
          .then((result) => {
              return result.json();
          })
          .then(async data =>{

              store.dispatch(loadZoneAlerts(data)) 
          })
          .catch(console.log)
      }, 60000)

      this.setState({
          interval
      })
  }

  async getAllAlertsZone (id) {
        await fetch(`https://drivingapp-monitor-back.herokuapp.com/alerts/all/zone/${id}`)
        .then((result) => {
            return result.json();
        })
        .then(data =>{
            store.dispatch(loadAlertsZoneData(id,data))
        })
   }
   
   getZones () {
        fetch ("https://smartsecurity-webservice.herokuapp.com/api/zone?status=1")
        .then((result) => {
            return result.json();
        }).then((zones)=> {
            store.dispatch(loadZones(zones));
        })
   }
  componentDidMount(){
        this.socket.on('severityalerts', (data) =>store.dispatch(loadSeverityAlerts(data)));
      this.socket.on('categoryalerts', (data) =>store.dispatch(loadCategoryAlerts(data)));
      this.socket.on('zonealerts' , (data) =>store.dispatch(loadZoneAlerts(data)));
      this.getAlertsCategory();
      this.getAlertsSeverity();
      this.getAlertsZone();
      this.getZones();
  }
  componentWillUnmount () {
      clearInterval(this.state.interval);
  }
  render() {
    return (
      <Router>
        <div style={{fontSize : 15}}>
            <div className="main-panel">
                <Route path="/:active?" component={Nav} />
                <div className="content" >
                    <Switch>
                        <Route exact={true}  path="/" component={Alerts} />
                        <Route path="/awards" component={Awards} />
                        <Route path="/map" component={Map} />
                        <Route path="/search" component={Search} />
                        <Route path="/places/zones" component={Zones} />
                    </Switch>
                </div>
                <Footer />
            </div>
            <Route path="/:active?" component={SideBar} />
        </div>
      </Router>
    );
  }
}


