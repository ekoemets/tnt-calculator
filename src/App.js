import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { TableWrapper } from './components/TableWrapper';
import {Container, Row, Col} from 'react-bootstrap';

function App() {
  return (
    <div className="App">
      <Container>
        <Row className="justify-content-start">      
          <TableWrapper></TableWrapper>
        </Row>
      </Container>

    </div>
  );
}

export default App;
