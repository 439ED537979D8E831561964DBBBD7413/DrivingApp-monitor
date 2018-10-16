import React from 'react';
import SideBar from "./Views/SideBar"

import Alerts from "./Views/Alerts"
import Choices from "./Views/Choices"

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
          <Route exact path="/choices" component={Choices} />
        </div>
      </Router>
    );
  }
}
