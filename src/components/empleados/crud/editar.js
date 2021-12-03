import React from "react";
import { request } from "../../helper/helper";
import { Container, Form, Row } from "react-bootstrap";
import Loading from "../../loading/loading";
import MessagePrompt from "../../prompts/message";

import confirmationPrompts from "../../prompts/confirmation";

export default class EmpleadosEditar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idEmpleado: this.props.getIdEmpleado(),
      redirect: false,
      message: {
        text: "",
        show: false,
      },
      loading: false,
      empleado: {
        codigo: "",
        nombre: "",
        categoria: "",
        precio: "",
        cantidad: "",
        stockMinimo: "",
      },
    };
    this.onExitedMessage = this.onExitedMessage.bind(this);
  }

  componentDidMount() {
    this.getEmpleado();
  }

  getEmpleado() {
    this.setState({ loading: true });
    request
      .get(`/empleados/${this.state.idEmpleado}`)
      .then((response) => {
        console.log(response);
        this.setState({
          empleado: response.data,
          loading: false,
        });
      })
      .catch((err) => {
        console.error(err);
        this.setState({ loading: false });
      });
  }

  setValue(index, value) {
    this.setState({
      empleado: {
        ...this.state.empleado,
        [index]: value,
      },
    });
  }

  guardarEmpleados() {
    this.setState({ loading: true });
    request
      .post("/empleados", this.state.empleado)
      .then((response) => {
        if (response.data.exito) {
          this.setState({
            redirect: response.data.exito,
            message: {
              text: response.data.msg,
              show: true,
            },
          });
        }
        this.setState({ loading: false });
      })
      .catch((error) => {
        console.error(err);
        this.setState({ loading: true });
      });
  }

  onExitedMessage() {
    if (this.state.redirect) {
      this.props.changeTab("buscar");
    }
  }

  render() {
    return (
      <Container id="empleados-crear-container">
        <MessagePrompt
          text={this.state.message.text}
          show={this.state.message.show}
          duration={3000}
          onExited={this.onExitedMessage}
        />

        <confirmationPrompts />

        <Loading show={this.state.loading} />

        <Row>
          <h1>Editar Producto</h1>
        </Row>
        <Row>
          <Form>
            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Codigo producto</Form.Label>
              <Form.Control
                value={this.state.empleado.codigo}
                onChange={(e) => this.setValue("codigo", e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Nombre Producto</Form.Label>
              <Form.Control
                value={this.state.empleado.nombre}
                onChange={(e) => this.setValue("nombre", e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Categoria</Form.Label>
              <Form.Control
                value={this.state.empleado.categoria}
                onChange={(e) => this.setValue("categoria", e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                value={this.state.empleado.precio}
                onChange={(e) => this.setValue("precio", e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Cantidad</Form.Label>
              <Form.Control
                value={this.state.empleado.cantidad}
                onChange={(e) => this.setValue("cantidad", e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Stock Minimo</Form.Label>
              <Form.Control
                value={this.state.empleado.stockMinimo}
                onChange={(e) => this.setValue("stockMinimo", e.target.value)}
              />
            </Form.Group>

            <Button
              variant="primary"
              onClick={() => console.log(this.guardarEmpleados)}
            >
              Guardar Producto
            </Button>
          </Form>
        </Row>
      </Container>
    );
  }
}
