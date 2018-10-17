import React from 'react';
import BestReporters from './Components/Awards/Best/BestReporters';

export default class Awards extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            bestUsers : []
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
    }

    render () {
        return (
            <div className="content" >
                <BestReporters bestUsers={this.state.bestUsers}/>
            </div>
        )
    }
}