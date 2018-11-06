import React from 'react';
import SideBar from "./Views/SideBar"
import Nav from "./Views/Nav"
import Footer from './Views/Footer'

import Alerts from "./Views/Alerts"
import Awards from "./Views/Awards"
import Map from './Views/Components/GoogleMap'
import Search from './Views/Search';


import { BrowserRouter as Router, Route} from "react-router-dom";

import { loadCategoryAlerts , loadSeverityAlerts, loadZoneAlerts, loadAlertsZoneData} from './Redux/Actions/index';
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

  


  componentDidMount(){
      this.socket.on('severityalerts', (data) =>store.dispatch(loadSeverityAlerts(data)));
      this.socket.on('categoryalerts', (data) =>store.dispatch(loadCategoryAlerts(data)));
      this.socket.on('zonealerts' , (data) =>store.dispatch(loadZoneAlerts(data)));
      this.getAlertsCategory();
      this.getAlertsSeverity();
      this.getAlertsZone();
  }

  componentWillUnmount () {
      clearInterval(this.state.interval);
  }

  render() {
    return (
      <Router>
        <div>
            <div className="main-panel">
                <Route path="/:active?" component={Nav} />
                <div className="content" >
                    <Route exact path="/" basename="/alerts" component={Alerts} />
                    <Route exact path="/awards" component={Awards} />
                    <Route exact path="/map" component={Map} />
                    <Route exact path="/search" component={Search} />
                    <Route exact path="/places" component={Places} />
                </div>
            </div>
            <Route path="/:active?" component={SideBar} />
            <Footer />
        </div>
      </Router>
    );
  }
}

class Places extends React.Component {
    render () {
        return (
        <div>
            <ul className="nav nav-pills nav-pills-primary nav-pills-icons" role="tablist">
                
                <li className="nav-item">
                    <a className="nav-link" href="#dashboard-1" role="tab" data-toggle="tab">
                        <i className="tim-icons icon-laptop"></i>
                        Dashboard
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link active" href="#schedule-1" role="tab" data-toggle="tab">
                        <i className="tim-icons icon-settings-gear-63"></i>
                        Settings
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#tasks-1" role="tab" data-toggle="tab">
                        <i className="tim-icons icon-calendar-60"></i>
                        Tasks
                    </a>
                </li>
            </ul>
            <div className="tab-content tab-space">
                <div className="tab-pane active" id="dashboard-1">
                Collaboratively administrate empowered markets via plug-and-play networks. Dynamically procrastinate B2C users after installed base benefits.
                <br/><br/>
                Dramatically visualize customer directed convergence without revolutionary ROI.
                </div>
                <div className="tab-pane" id="schedule-1">
                Efficiently unleash cross-media information without cross-media value. Quickly maximize timely deliverables for real-time schemas.
                <br/><br/>Dramatically maintain clicks-and-mortar solutions without functional solutions.
                </div>
                <div className="tab-pane" id="tasks-1">
                    Completely synergize resource taxing relationships via premier niche markets. Professionally cultivate one-to-one customer service with robust ideas.
                    <br/><br/>Dynamically innovate resource-leveling customer service for state of the art customer service.
                </div>
            </div>
        </div>
        
        )
    } 
}
