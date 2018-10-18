import React from 'react';

export default class Drivers extends React.Component {
    render() {
        let badFacesNum = {
            1:5,
            2:4,
            3:3,
            4:2,
            5:1
        }
        var faces = [];
        for (let i =0 ; i < badFacesNum[this.props.place.toString()]; i++)
        faces.push(0);
        return (
            <div className={" card col-sm-12 col-lg-2"} align="center" style={{margin: 5}}>
                <div  style={{height : 40, marginTop: 10}} >
                    <img alt="" src="/assets/img/user-image-.png" style={{height: 50,width:50}}/>
                </div>
                <div>
                {
                    faces.map((star, i)=>{
                        return (
                            <img 
                            alt="" 
                            key={i}
                            style={{height:20, width:20}} 
                            src="/assets/img/skull.png"/> 
                        )
                    })
                }
                </div>
                <p className="h5">{this.props.alerts}</p>
                <p>{this.props.name}</p>
            </div>
        )
    }
}