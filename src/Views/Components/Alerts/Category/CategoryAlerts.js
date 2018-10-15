import React from 'react';
import CategoryCards from './CategoryCards'
import Graph from '../../Graphana'

export default class CategoryAlerts extends React.Component {
    render() {
        return (
            <div className="tab-pane fade show active"  role="tabpanel" aria-labelledby="nav-category-tab">
                <CategoryCards />
                <Graph
                    title = "Alerts by Category"
                    subtitle = "Last hour performance"
                    url = "http://35.185.120.11:3000/d-solo/740rn61mk/alerts?panelId=2&orgId=1&from="
                />
            </div>
        )
    }
}