import React, { Component } from 'react';
import Cell from "./Cell";

export class TRow extends Component{

    constructor(props){
        super();
        this.state = {
            row: props.row
        }
    }

    componentWillReceiveProps(newProps){
        this.setState({row: newProps.row})
    }

    render(){
        return(
            <tbody>
            <tr>
                {this.props.row.map((cell, index) => (
                    <Cell key={index} row={this.state.row} id={index}>

                    </Cell>
                ))}
            </tr>
            </tbody>

        )
    }
}

export default TRow;