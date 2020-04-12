import React, { Component } from 'react';
import HeadCell from "./HeadCell";

export class Row extends Component{
    
    render(){
        return(
            <thead>
            <tr>
                <th>X/Y</th>
                {this.props.row.map((cell, index) => (
                    <HeadCell key={index} row={this.props.row} id={index}>
                        
                    </HeadCell>
                ))}
            </tr>
            </thead>
        )
    }
}

export default Row;