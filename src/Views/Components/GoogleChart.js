import React from 'react';
import Chart from "react-google-charts";

export default class GoogleChart extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            pieOptions : {
                title: this.props.title,
                pieHole: 0.4,
                is3D: this.props.is3D,
                slices: [
                  {
                    color: "#2BB673"
                  },
                  {
                    color: "#d91e48"
                  },
                  {
                    color: "#007fad"
                  },
                  {
                    color: "#e9a227"
                  }
                ],
                legend: {
                  position: "bottom",
                  alignment: "center",
                  textStyle: {
                    color: "233238",
                    fontSize: 14
                  }
                },
                tooltip: {
                  showColorCode: true
                },
                chartArea: {
                  left: 0,
                  top: 0,
                  width: "100%",
                  height: "80%"
                },
                fontName: "Roboto"
            }
        }
    }

    randomInt = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    randomColor () {
        var h = this.randomInt(0, 360);
        var s = this.randomInt(42, 98);
        var l = this.randomInt(40, 90);
        return `hsl(${h},${s}%,${l}%)`;
    }
    
    render() {
        return (
            <Chart
                chartType={this.props.chartType}
                data={this.props.data}
                options={this.state.pieOptions}
                graph_id={this.props.graph_id}
                width={this.props.width}
                height={this.props.height}
                legend_toggle
            />
        )
    }
}