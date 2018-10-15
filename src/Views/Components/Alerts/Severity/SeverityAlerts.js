import React from 'react';
import SeverityCards from './SeverityCards'
import Graph from '../../Graphana'

export default class SeverityAlerts extends React.Component {
    render() {
        return (
            <div className="tab-pane fade show active"  role="tabpanel" aria-labelledby="nav-category-tab">
                <SeverityCards />
                <Graph
                    title = "Alerts by Severity"
                    subtitle = "Last hour performance"
                    url = "http://35.185.120.11:3000/d-solo/740rn61mk/alerts?panelId=6&orgId=1&from="
                />
            </div>
        )
    }
}