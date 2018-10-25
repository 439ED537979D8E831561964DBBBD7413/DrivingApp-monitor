import React from 'react';
import Graph from '../../Graphana'

export default class SubcategoryAlerts extends React.Component {
    render() {
        return (
            <div className="tab-pane fade show active"  role="tabpanel" aria-labelledby="nav-category-tab">
                <Graph
                    title = "Alerts by Subcategory"
                    subtitle = "Last hour performance"
                    url = "http://35.185.120.11:3000/d-solo/-bd1U8xmk/alerts?orgId=1&panelId=4&from="
                />
            </div>
        )
    }
}