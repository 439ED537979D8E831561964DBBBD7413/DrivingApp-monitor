import React from "react";

export default class ZoneItem extends React.Component {
    render () {
        return (
            <tr>
                <th scope="row">{this.props.id.replace('Zone_','')}</th>
                <td >
                    {this.props.name}
                </td>
                <td>
                    {this.props.address}
                </td>
                <td className="text-justify">
                    {this.props.description}
                </td>
                <td className="row text-center">
                    <i className="material-icons">
                    remove_red_eye
                    </i>
                    <i className="material-icons">
                        delete
                    </i>
                </td>
            </tr>
        )
    }
}