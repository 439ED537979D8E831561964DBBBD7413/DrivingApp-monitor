import React from 'react';
//import {Pie} from 'react-chartjs-2';
//import {Chart} from 'react-google-charts';
import Chart from 'chart.js';

export default class MyChart extends React.Component { 

    randomInt = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    randomColor () {
        var h = this.randomInt(0, 360);
        var s = this.randomInt(42, 98);
        var l = this.randomInt(40, 90);
        return `hsl(${h},${s}%,${l}%)`;
    }

    componentDidMount (){
        var tempData = this.props.data;
        var labels = [];
        var data = [];
        var colors = [];
        tempData.map((item) => {
            labels.push(item[1])
            data.push(item[2]);
            colors.push(this.randomColor());
            return true;
        });
        const node = this.node;
        new Chart(node, {
        type: this.props.type,
        data: {
            labels: labels,
            datasets: [
                {
                    label: this.props.label,
                    data: data,
                    backgroundColor: colors
                }
            ]
        }
        });
    }
    render () {
        return (
            <div className="card card-stats">
                <canvas 
                    id="myChart" 
                    ref={node => (this.node = node)} 
                    width={this.props.width}
                    height={this.props.height}>
                </canvas>
            </div>
        )
    }
}