import React from 'react';
import Alerts from "./Views/Alerts"
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
      <div>
        <Alerts />
      </div>
    );
  }
}
