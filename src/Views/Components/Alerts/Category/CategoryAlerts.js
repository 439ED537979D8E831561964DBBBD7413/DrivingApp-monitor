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
                    url = "http://35.196.174.137:3000/d-solo/vlpsRxJik/alerts?panelId=2&orgId=1&tab=metrics&from="
                />
            </div>
        )
    }
}