import React, { Component } from 'react';

export class Result extends Component{

    render(){
        return(
            <div className="text-left">
            {Object.keys(this.props.result).map(key => 
                <p className="my-1">{key.toUpperCase()}  {this.props.result[key]}</p>)}
                
            </div>
        )
    }
}

export default Result;