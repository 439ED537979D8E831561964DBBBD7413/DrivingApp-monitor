import React from "react";

export default class ZoneItem extends React.Component {
    render () {
        return (
            <tr>
                <td>
                    {this.props.id.replace('Zone_','')}
                </td>
                <td>
                    {this.props.name}
                </td>
                <td>
                    {this.props.address}
                </td>
                <td>
                    {this.props.description}
                </td>
                <td>
                    <i className="material-icons">
                        map
                    </i>
                    <i className="material-icons">
                        edit
                    </i>
                    <i className="material-icons">
                        delete
                    </i>
                </td>
            </tr>
        )
    }
}