import React, { Component } from 'react';
import {Form} from 'react-bootstrap';

export class Cell extends Component{
    constructor(props){
        super(props);
        this.state = {
            value: props.row[props.id]
        }
    }

    componentWillReceiveProps(newProps){
        this.setState({value: newProps.row[this.props.id]})
    }

    handleChange = (event) =>{
        this.props.row[this.props.id] = event.target.value;
        this.setState({value: event.target.value})
    }

    render(){
        return(
            <th>
            <Form.Control value={this.state.value === null ? "" : this.state.value} onChange={this.handleChange} />
            </th>
        )
    }
}

export default Cell;