import React from 'react';
import { DateTime } from 'luxon';

export default class Graph extends React.Component { 
    constructor (props) {
        super(props);
        var now = DateTime.utc();
        this.state = {
            now : now.ts,
            minusThirty : now.minus({hours : 1}).endOf("minutes").ts,
            timeMessage : "Updated right now",
            interval : null
        };
        
    }
    componentDidMount() {
        let t = this;
        var interval = setInterval(() => {
            var now = DateTime.utc();
            t.setState({
                now : now.ts,
                minusThirty : now.minus({hours : 1}).endOf("minutes").ts
            });
        }, 60000)

        t.setState({
            interval
        })
    }
    componentWillUnmount(){
        clearInterval(this.state.interval);
    }
    render () {
        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="card ">
                    <div className="card-header ">
                        <h5 className="card-title">{this.props.title}</h5>
                        <p className="card-category">{this.props.subtitle}</p>
                    </div>
                    <div className="card-body ">
                        <iframe 
                            src={`${this.props.url}${this.state.minusThirty}&to=${this.state.now}`} 
                            width="100%" 
                            height="300"
                            frameBorder="0"
                            title={this.props.title}>
                        </iframe>
                    </div>
                    <div className="card-footer ">
                        <hr/>
                        <div className="stats">
                        <i className="fa fa-history"></i> {this.state.timeMessage}
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}