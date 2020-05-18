import React, { Component } from 'react';
import  {Table, Button, ButtonGroup} from 'react-bootstrap';
import TRow from './TRow';
import RowHead from './RowHead';
import calcTabel from './TNTcalculator'
import Result from './Result';
import {evaluate} from 'mathjs';

export class TableWrapper extends Component{
    constructor(){
        super();
        this.state = {
            size : 2,
            height: 2,
            width: 2,
            rows : this.createCells(2, 2),
            result: {}
            
        }
    }

    createCells(x, y){
        let rows = [];
        for(let i= 0; i< x + 1; i++){
            rows.push([]);
            let end = y + 1;
            if(i === 0){
                end = y;
            }
            for(let j = 0; j < end; j++){
                rows[i].push(null);
            }
        }
        return rows;
    }

    onCalculate = (event) =>  {
        var tabel = this.state.rows;
        var read = [];
        var veerud = [];
        for (let x of tabel[0]){
            try{
                veerud.push([evaluate(x)]);
            }catch(err){
                this.setState({...this.state, result: {"Error":`Invalid input "${x}"`}})
                return null;
            }

        }

        for (let i=1; i< tabel.length; i++){
            read.push(tabel[i].map(x => {
                let val = null;
                if (x !== null){
                    try{
                        val =evaluate(x);
                    }catch(err){
                        this.setState({...this.state, result: {"Error": `Invalid input "${x}"`}})
                    }
                }
                return val;
               }));
        }

        for (let i=0; i<veerud.length; i++){
            for (let j=0; j<read.length; j++){
                veerud[i].push(read[j][i+1]);
            }
        }

        let result = calcTabel(read,veerud);
        console.log(result)
        this.setState({...this.state, result: result})
    }

    decreaseSize = () => {
        if(this.state.size > 2){
            this.state.rows.pop()
            this.state.rows.map(row => row.pop())
            this.setState({...this.state,
                size: this.state.size -1,
                rows: this.state.rows
             })
        }
    }

    increaseSize = () => {
        this.state.rows.map(row => row.push(null));
        this.state.rows.push([...Array(this.state.size + 2).keys()].map(i => null))
        this.setState({...this.state, 
                       size: this.state.size +1,
                       rows: this.state.rows
                    })
    }

    increaseHeight = () => {
        this.state.rows.push(Array(this.state.width + 1).fill(null))
        this.setState({...this.state, 
                       height: this.state.height + 1,
                       rows: this.state.rows
                    })
    }

    decreaseHeight = () => {
        if(this.state.height > 1){
            this.state.rows.pop();
            this.setState({...this.state, 
                           height: this.state.height - 1,
                           rows: this.state.rows
                        })
        }

    }

    increaseWidth = () => {
        for (let i = 0; i < this.state.rows.length; i++) {
            const element = this.state.rows[i];
            element.push(null)
        }
        this.setState({...this.state, 
            width: this.state.width + 1,
            rows: this.state.rows
         })
    }

    decreaseWidth = () => {
        if(this.state.width > 1){
            for (let i = 0; i < this.state.rows.length; i++) {
                const element = this.state.rows[i];
                element.pop()
            }
            this.setState({...this.state, 
                width: this.state.width - 1,
                rows: this.state.rows
             })

        }
    }
    clearValues = () => {

        this.setState({...this.state, 
            rows : this.createCells(this.state.height, this.state.width)
         })
         console.log(this.state)
    }

    render(){
        return(
            <div>
                <div className="d-flex justify-content-start my-3">
                    <span className="align-self-center"><h4 className="my-0 mr-3">ROWS</h4></span>
                    <ButtonGroup>
                        <Button variant="secondary border-right" onClick={this.decreaseHeight}>-</Button>
                        <Button variant="secondary border-left" onClick={this.increaseHeight}>+</Button>
                    </ButtonGroup>
                    <span className="align-self-center"><h4 className="my-0 mx-3">COLS</h4></span>
                    <ButtonGroup>
                        <Button variant="secondary border-right" onClick={this.decreaseWidth}>-</Button>
                        <Button variant="secondary border-left" onClick={this.increaseWidth}>+</Button>
                    </ButtonGroup>
                    <Button variant="success ml-2" onClick={this.onCalculate}>Calculate</Button>
                    <Button variant="danger ml-2" onClick={this.clearValues}>Clear</Button>
                </div>
            <Table style={{width: "auto"}} borderless size="sm">
                <RowHead key={0} handleChange={this.handleRowChange} row={this.state.rows[0]}></RowHead>
                {this.state.rows.map((row, index) => {
                    if(index !== 0){
                        return(<TRow key={index} handleChange={this.handleRowChange} row={row}>
                            </TRow>)
                    }
                    return null;
                })
                }
            </Table>
            <Result key={0} result={this.state.result}></Result>
            </div>
        )
    }
}
