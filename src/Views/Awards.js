import React from 'react';
import BestReporters from './Components/Awards/Best/BestReporters';
import WorsDrivers from './Components/Awards/Worst/WorstDrivers';

export default class Awards extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            bestUsers : [],
            worstUsers: []
        }
    }

    componentDidMount () {
        fetch ("https://drivingapp-monitor-back.herokuapp.com/awards/best")
        .then ( (alertsCount) =>{
            return alertsCount.json();
        }).then(( async json => {
            await json.map(async (item) => {
                await fetch(`http://smartsecurity-webservice.herokuapp.com/api/user/${item.owner}`)
                .then(user => {return user.json()})
                .then(async userdata => {
                    //console.log(item.place)
                    await this.setState({
                        bestUsers: [...this.state.bestUsers, {
                            name : userdata.firstName + " " + userdata.lastName,
                            count : item.total,
                            place : item.place
                        }]
                    })
                })
                return true;
            })
        }))

        fetch ("https://drivingapp-monitor-back.herokuapp.com/awards/worst")
        .then ( (alertsCount) =>{
            return alertsCount.json();
        }).then(( async json => {
            await json.map(async (item) => {
                await fetch(`http://smartsecurity-webservice.herokuapp.com/api/user/${item.owner}`)
                .then(user => {return user.json()})
                .then(async userdata => {
                    //console.log(item.place)
                    await this.setState({
                        worstUsers: [...this.state.worstUsers, {
                            name : userdata.firstName + " " + userdata.lastName,
                            count : item.total,
                            place : item.place
                        }]
                    })
                })
                return true;
            })
        }))
    }

    render () {
        console.log()
        return (
            <div className="content" >
                <BestReporters bestUsers={this.state.bestUsers}/>
                <WorsDrivers worstDrivers={this.state.worstUsers}/>
            </div>
        )
    }
}