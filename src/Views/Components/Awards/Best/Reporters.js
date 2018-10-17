import React from 'react';

export default class Reporters extends React.Component {
    render() {
        let starsNum = {
            1:5,
            2:4,
            3:3,
            4:2,
            5:1
        }
        var stars = [];
        for (let i =0 ; i < starsNum[this.props.place.toString()]; i++)
        stars.push(0);
        return (
            <div className={" card col-sm-12 col-lg-2"} align="center" style={{margin: 5}}>
                <div  style={{height : 40, marginTop: 10}} >
                    <img alt="" src="/assets/img/user-image-.png" style={{height: 50,width:50}}/>
                </div>
                <div>
                {
                    stars.map((star, i)=>{
                        return (
                            <img 
                            alt="" 
                            key={i}
                            style={{height:20, width:20}} 
                            src="/assets/img/star.png"/> 
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