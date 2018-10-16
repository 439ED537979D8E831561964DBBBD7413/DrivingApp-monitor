import React from 'react';
import Alerts from "./Views/Alerts"
import SideBar from "./Views/SideBar"
import { BrowserRouter as Router, Route} from "react-router-dom";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      hasData : false,
      message : "Welcome",
      labels : [],
      data :  [],
      backgroundColors: [],
      borderColors: []
    };
  }
  
  render() {
    return (
      <Router>
        <div>
          <Route path="/:active?" component={SideBar} />
          <Route exact path="/" component={Alerts} />
          <Route exact path="/choices" component={() => (
            <div>CHOICES</div>
          )} />
        </div>
      </Router>
    );
  }
}
