import React from 'react';
import SideBar from "./Views/SideBar"
import Nav from "./Views/Nav"

import Alerts from "./Views/Alerts"
import Awards from "./Views/Awards"

//import Map from './Views/Components/Map'
//import MapMutant from './Views/Components/MapMuntant'
//import Map from './Views/Components/ReactLeafletMap'
import Map from './Views/Components/GoogleMap'

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
                </div>
            </div>
            <Route path="/:active?" component={SideBar} />
            <Footer />
        </div>
      </Router>
    );
  }
}


class Footer extends React.Component {
    render () {
        return (
        <footer className="footer footer-black  footer-white ">
        <div className="container-fluid">
          <div className="row">
            <nav className="footer-nav">
              <ul>
                <li>
                  <a href="https://www.creative-tim.com" >Driving App</a>
                </li>
                <li>
                  <a href="http://blog.creative-tim.com/" >Documentation</a>
                </li>
                <li>
                  <a href="https://www.creative-tim.com/license" >Cenidet</a>
                </li>
              </ul>
            </nav>
            <div className="credits ml-auto">
              <span className="copyright">
                ©
                <script>
                  document.write(new Date().getFullYear())
                </script>, based in <i className="fa fa-heart heart"></i> Creative Tim template by Driving App
              </span>
            </div>
          </div>
        </div>
      </footer>
      ) 
    }
}