import React from 'react';
import axios from 'axios';
import { Container, Form, Button, Row, Col} from 'react-bootstrap';
import {APIHOST as host } from '../../app.json';
import { isNull } from 'util';
import Cookies from 'universal-cookie';
import { calculaExracionSesion } from '../helper/helper';
import Loading from '../loading/loading';

const cookies = new Cookies();

export default class login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            usuario: '',
            pass: '',
         };
    }

    iniciarSesion(){
        
        this.setState({ loading:true });

        axios.post(`${host}/usuarios/login`, {
            usuario: this.state.usuario,
            pass: this.state.pass,
           })
           .then(response => {
            if (isNull(response.data.token)) {
              alert('Usuario y/o contraseña invalidos');
            }else{
                cookies.set('_s', response.data.token, {
                    path: '/',
                    expires: calculaExracionSesion(),
                   });
                   { /*this.props.history.push('/home');*/}
                   this.props.history.push('/empleados');
           }
           this.setState({ loading:false });

           })
            .catch((err) => {
              console.log(err);
              this.setState({ loading:false });
            });
    }

    render() { 
        return (  
            <Container id= "login-container" style={{marginTop: 200}}>

                <Loading show={this.state.loading} />

        <Row>
        <Col
        sm="12"
        xs="12"
        md={{ span: 4, offset: 4}}
        lg={{ span: 4, offset: 4}}
        xl={{ span: 4, offset: 4}}
        >

        <Row>
            <h2>Iniciar Sesion</h2>
        </Row>
        <Col> 
        <Form>
  <Form.Group >
    <Form.Label style={{ float: 'left'}}>Usuario</Form.Label>
    <Form.Control
    onChange={(e) =>
    this.setState({ usuario: e.target.value })
    }
    />
   
    
    
  </Form.Group>

  <Form.Group >
    <Form.Label style={{ float: 'left'}}>Contraseña</Form.Label>
    <Form.Control
     type="password"
     onChange={(e) =>
     this.setState({ pass: e.target.value })
     }
    />
  
  </Form.Group>
  
  <Button variant="primary" 
  style={{ 
      marginTop:20,
      width:'100%',
      }}
      onClick= { () =>{
       this.iniciarSesion();
    }}
      >
     Iniciar Sesion
    </Button>
   </Form>
   </Col>
        </Col>
        </Row> 

     

</Container>
            );
    }
} 