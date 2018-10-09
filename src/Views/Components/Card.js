import React from 'react';

export default class Card extends React.Component { 

    constructor(props) {
        super(props)
        this.renderIcon = this.renderIcon.bind(this);
    }

    renderIcon() {
        if (this.props.iconColor !== undefined) {
            return(
                <i 
                className={"material-icons text-" + this.props.iconColor} 
                style={{fontSize:"48px"}}>
                    {this.props.icon}
                </i>  
            )
        }else {
            return(
                <i 
                className={"material-icons"} 
                style={{fontSize:"48px", color :this.props.colorCode }}>
                    {this.props.icon}
                </i>  
            )
        }
        
    }

    render () {
        return (
            <div className="card card-stats">
                <div className="card-body ">
                    <div className="row">
                        <div className="col-5 col-md-4">
                            <div className="icon-big text-center">
                                {this.renderIcon()}                    
                            </div>
                        </div>
                        <div className="col-7 col-md-8">
                            <div className="numbers">
                                <p className="card-category">{this.props.title}</p>
                                <p className="card-title">{this.props.count}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-footer ">
                    <hr/>
                    <div className="stats">
                        <i className="fa fa-clock-o"></i> {this.props.time}
                    </div>
                </div>
            </div>
        )
    }
}