import React from 'react';
import Reporters from './Reporters';
export default class BestReporters extends React.Component{
    render() {
        var bestData = this.props.bestUsers;
        if (bestData !== undefined){
            for(var i=1; i<bestData.length; i++){
                for(var j=0; j< (bestData.length - i); j++){
                    if( bestData[j]["place"] > bestData[j+1]["place"]){
                        let k =bestData[j+1];
                        bestData[j+1] = bestData[j];
                        bestData[j]=k;
                    }
                }
            }
            
        }
        return (
            <div className="card" >
                <div className="card-header ">
                    <h5 className="card-title">Best Reporters</h5>
                    <p className="card-category">Alerts sent manually from DrivingApp </p>
                </div>
                <div className="card-body row justify-content-center ">
                {
                    bestData.map((data, i) =>{
                        return (
                            <Reporters 
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