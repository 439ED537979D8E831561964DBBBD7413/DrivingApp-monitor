import React from 'react';
import { HashRouter as Router, Route, Switch} from "react-router-dom";
import ZonesPanel from './ZonesPanel';
import ShowZone from './ShowZone'


export default class Zones extends React.Component {
    render(){
        return(
            <Router >
                <div>
                    <Switch>
                        <Route path="/places/zones/" exact={true} component={ZonesPanel} />
                        <Route path="/places/zones/create" component={() => <div>HI</div>} />
                    </Switch>
                    <Route path="/places/zones/show/:id" component={ShowZone} />
                </div>
            </Router>
        )
    }
}

