import React from 'react';
//import SubcategoryCards from './SubcategoryCards'
import Graph from '../../Graphana'

export default class SubcategoryAlerts extends React.Component {
    render() {
        return (
            <div className="tab-pane fade show active"  role="tabpanel" aria-labelledby="nav-category-tab">
                {/*<SubcategoryCards />*/}

                <Graph
                    title = "Alerts by Subcategory"
                    subtitle = "Last hour performance"
                    url = "http://35.196.174.137:3000/d-solo/7wK4ckAik/alerts?orgId=1&panelId=4&from="
                />
            </div>
        )
    }
}