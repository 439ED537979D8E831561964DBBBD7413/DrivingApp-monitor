
import React from 'react';
import { HashRouter as Router, Route, NavLink, Switch} from "react-router-dom";

import CategoryAlerts from './Components/Alerts/Category/CategoryAlerts';
import SubcategoryAlerts from './Components/Alerts/Subcategory/SubcategoryAlerts';
import SeverityAlerts from './Components/Alerts/Severity/SeverityAlerts';
import ZoneAlerts from './Components/Alerts/Zones/ZoneAlerts';

export default class Alerts extends React.Component {
    render() {
        return (
        <Router basename="#">
            <div>
                <nav>
                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                        <li>
                            <NavLink exact className="nav-item nav-link" activeClassName='active'  to="/">Category</NavLink>
                        </li>
                        <li>
                            <NavLink exact className="nav-item nav-link" activeClassName='active' to="/sub">Subcategory</NavLink>
                        </li>
                        <li>
                            <NavLink exact className="nav-item nav-link" activeClassName='active' to="/severity">Severity</NavLink>
                        </li>
                        <li>
                            <NavLink exact className="nav-item nav-link" activeClassName='active' to="/zones">Zones</NavLink>
                        </li>
                    </div>
                </nav>

                <div style={{marginTop : 10}}>
                <Switch>
                    <Route exact={true} path="/" component={CategoryAlerts} />
                    <Route path="/sub" component={SubcategoryAlerts} />
                    <Route path="/severity" component={SeverityAlerts} />
                    <Route path="/zones" component={ZoneAlerts} />
                </ Switch>
                </div>
            </div>
        </Router>
        )
    }
}
