import React, { Component } from 'react';
import HeadCell from "./HeadCell";

export class Row extends Component{

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
            <thead>
            <tr>
                <th className="align-middle"><h4>X/Y</h4></th>
                {this.props.row.map((cell, index) => (
                    <HeadCell key={index} row={this.state.row} id={index}>
                        
                    </HeadCell>
                ))}
            </tr>
            </thead>
        )
    }
}

export default Row;