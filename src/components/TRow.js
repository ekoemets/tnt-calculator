import React, { Component } from 'react';
import Cell from "./Cell";

export class TRow extends Component{

    render(){
        return(
            <tbody>
            <tr>
                {this.props.row.map((cell, index) => (
                    <Cell key={index} row={this.props.row} id={index}>

                    </Cell>
                ))}
            </tr>
            </tbody>

        )
    }
}

export default TRow;