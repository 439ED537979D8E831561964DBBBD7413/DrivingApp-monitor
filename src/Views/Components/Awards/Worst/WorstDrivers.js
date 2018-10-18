import React from 'react';
import Drivers from './Drivers';
export default class WorstDrivers extends React.Component{
    render() {
        var worstData = []
        if (this.props.worstDrivers !== undefined){
            worstData = this.props.worstDrivers;
            for(var i=1; i<worstData.length; i++){
                for(var j=0; j< (worstData.length - i); j++){
                    if( worstData[j]["place"] > worstData[j+1]["place"]){
                        let k =worstData[j+1];
                        worstData[j+1] = worstData[j];
                        worstData[j]=k;
                    }
                }
            }
            
        }
        return (
            <div className="card" >
                <div className="card-header ">
                    <h5 className="card-title">Worst Drivers</h5>
                    <p className="card-category">Alerts sent automatically from DrivingApp </p>
                </div>
                <div className="card-body row justify-content-center ">
                {
                    worstData.map((data, i) =>{
                        return (
                            <Drivers
                            key={i}
                            name={data.name}
                            alerts={data.count}
                            place={data.place}
                            />
                        )
                    })
                }
                </div>
                <div className="card-footer ">
                    <hr/>
                    <div className="stats">
                    <i className="fa fa-history"></i> Updated rigth now
                    </div>
                </div>
            </div>
        )
    }
}