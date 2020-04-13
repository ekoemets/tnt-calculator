import React, { Component } from 'react';
import  {Table, Button, ButtonGroup} from 'react-bootstrap';
import TRow from './TRow';
import RowHead from './RowHead';
import calcTabel from './TNTcalculator'
import Result from './Result';

export class TableWrapper extends Component{
    constructor(){
        super();
        this.state = {
            size : 2,
            rows : this.createCells(2),
            result: {}
            
        }
    }

    createCells(x){
        let rows = [];
        for(let i= 0; i< x + 1; i++){
            rows.push([]);
            let end = x + 1;
            if(i === 0){
                end = x;
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
            veerud.push([parseFloat(x)]);
        }
        for (let i=1; i< tabel.length; i++){
            read.push(tabel[i].map(x => {
                if (x !== null && x.includes("/")){
                   let osad = x.split("/");
                   return parseFloat(osad[0]) / parseFloat(osad[1]);
                }
                else {
                    return parseFloat(x);
                }}));
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

    clearValues = () => {
        this.setState({...this.state, 
            rows : this.createCells(this.state.size)
         })
         console.log(this.state)
    }

    render(){
        return(
            <div>
                <div className="d-flex justify-content-start my-3">
                    <span className="align-self-center"><h4 className="my-0 mr-3">ROW COUNT</h4></span>
                    <ButtonGroup>
                        <Button variant="secondary border-right" onClick={this.decreaseSize}>-</Button>
                        <Button variant="secondary border-left" onClick={this.increaseSize}>+</Button>
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
                })
                }
            </Table>
            <Result key={0} result={this.state.result}></Result>
            </div>
        )
    }
}
