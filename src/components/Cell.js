import React, { Component } from 'react';

export class Cell extends Component{
    
    handleChange = (event) =>{
        console.log(event.target.value);
        this.props.row[this.props.id] = event.target.value;
        console.log(this.props.row);

    }
    render(){
        return(
            <td>
            <input className="" type="number" onChange={this.handleChange}/>
            </td>
        )
    }
}

export default Cell;