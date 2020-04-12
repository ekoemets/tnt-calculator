import React, { Component } from 'react';
import  {Table, Button} from 'react-bootstrap';
import Row from './Row';
import RowHead from './RowHead';

export class TableWrapper extends Component{
    constructor(){
        super();
        this.state = {
            size : 2,
            rows : this.createCells(2)
            
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
        console.log(this.state.rows)
        
    }


    render(){
        return(
            <div>
            <Table className="bordered">
                <RowHead key={0} handleChange={this.handleRowChange} row={this.state.rows[0]}></RowHead>
                {this.state.rows.map((row, index) => {
                    if(index != 0)
                    return(<Row key={index} handleChange={this.handleRowChange} row={row}>
                        </Row>)

                })
                }
            </Table>
            <Button variant="primary" onClick={this.onCalculate}>Calculate</Button>
            </div>
        )
    }
}
