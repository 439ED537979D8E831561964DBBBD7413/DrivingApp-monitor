import React from "react";

export default class ZoneItem extends React.Component {
    constructor (props) {
        super(props);
        this.selectZone = this.selectZone.bind(this);
    } 

    selectZone () {
        this.props.selectZone(this.props.index)
    }

    render () {
        return (
            <tr >
                <td >
                    {this.props.name}
                </td>
                <td className="text-trucate">
                    {this.props.address}
                </td>
                <td >
                    <i className="material-icons col-md-2 col-sm-12" style={{fontSize: 18}} onClick={this.selectZone}>
                        remove_red_eye
                    </i>
                    <i className="material-icons col-md-2 col-sm-12" style={{fontSize: 18}}>
                        local_parking
                    </i>
                    <i className="material-icons col-md-2 col-sm-12" style={{fontSize: 18}}>
                        directions
                    </i>
                </td>
            </tr>
        )
    }
}