import React from 'react';
import { NavLink, withRouter} from "react-router-dom";

class SideBar extends React.Component {
    constructor (props) {
        super(props);
        //this.changePath = this.changePath.bind(this);
        this.state = {
            alerts : "",
            choices : ""
        };
    }

    componentDidMount(){
        this.changePath(this.props.location.pathname)
    }

    

    changePath(pathname) {
        if (pathname === "/"){
            this.setState({
                alerts : "active",
                 choices : ""
            })
        }else if (pathname === "/choices") {
            this.setState({
                alerts : "",
                 choices : "active"
            })
        }
    }

    componentWillReceiveProps (nextProps){
        this.changePath(nextProps.location.pathname)
    }

  render () {
    return (
      <div className="sidebar"  data-active-color="danger">
        <div className="logo">
          <a href="http://www.creative-tim.com" className="simple-text logo-mini">
            <div className="logo-image-small">
              <img src="../assets/img/logo.png" alt=""/>
            </div>
          </a>
          <a href="/" className="simple-text logo-normal">
            Driving Monitor
          </a>
        </div>
        <div className="sidebar-wrapper">
          <ul className="nav">
            <li className={this.state["alerts"]}>
                <NavLink 
                exact 
                className="nav-item nav-link" 
                activeClassName='active'  
                to="/"
                > <i className="nc-icon nc-alert-circle-i"></i> Alerts Monitor</NavLink>
            </li>
            <li className={this.state["choices"]}>
              <NavLink exact className="nav-item nav-link" activeClassName='active'  to="/choices"> <i className="nc-icon nc-circle-10"></i>Users Monitor</NavLink>
            </li>
            <li>
              <a href="./map.html">
                <i className="nc-icon nc-globe"></i>
                <p>Areas Delimitations</p>
              </a>
            </li>
            <li>
              <a href="./notifications.html">
                <i className="nc-icon nc-bell-55"></i>
                <p>Notifications</p>
              </a>
            </li>
            <li>
              <a href="./user.html">
                <i className="nc-icon nc-single-02"></i>
                <p>Settings</p>
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default withRouter(SideBar);