import React from 'react';
import { request } from '../helper/helper';
import { Container, Row } from 'react-bootstrap';
import './empleados.css';


export default class EmpleadosBuscar extends React.Component {
    constructor(props) {
     super(props);
     this.state = {}
    }
    componentDidMount() {
        request
         .get('/empleados')
         .then((response) => {
           console.log(response.data);
         })
         .catch((err) => {
           console.error(err);
         });
        }


    render() {
      return (
       <Container id="empleados-buscar-container">
         <Row>
           <h1>Buscar empleados</h1>
         </Row>
        </Container>
      );
     }
    }