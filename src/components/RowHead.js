import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cell from "./Cell";

export class Row extends Component{
    constructor(props){
        super(props);
    }

    handleCellChange(){

    }

    render(){
        return(
            <thead>
            <tr>
                <th>X/Y</th>
                {this.props.row.map((cell, index) => (
                    <Cell key={index} row={this.props.row} id={index}>
                        
                    </Cell>
                ))}
            </tr>
            </thead>
        )
    }
}

export default Row;