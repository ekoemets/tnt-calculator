import React, { Component } from 'react';

export class Cell extends Component{

    handleChange = (event) =>{
        this.props.row[this.props.id] = event.target.value;
    }

    render(){
        return(
            <th>
            <input className="" type="number" onChange={this.handleChange}/>
            </th>
        )
    }
}

export default Cell;