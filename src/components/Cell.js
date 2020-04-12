import React, { Component } from 'react';

export class Cell extends Component{
    
    handleChange = (event) =>{
        this.props.row[this.props.id] = event.target.value;
    }

    render(){
        return(
            <td>
            <input className="" onChange={this.handleChange}/>
            </td>
        )
    }
}

export default Cell;