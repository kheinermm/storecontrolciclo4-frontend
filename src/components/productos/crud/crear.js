import React from "react";
import { request } from "../../helper/helper";
import { Container, Form, Row, Button } from "react-bootstrap";
import Loading from "../../loading/loading";
import MessagePrompt from "../../prompts/message";

export default class ProductosCrear extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      message: {
        text: "",
        show: false,
      },
      loading: false,
      producto: {
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

  setValue(index, value) {
    this.setState({
      producto: {
        ...this.state.producto,
        [index]: value,
      },
    });
  }

  guardarProductos() {
    console.log(this.state.productos);
    this.setState({ loading: true });
    request
      .post("/productos", this.state.producto)
      .then((response) => {
        console.log(response.data);
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
        console.error(error);
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
      <Container id="productos-crear-container">
        <MessagePrompt
          text={this.state.message.text}
          show={this.state.message.show}
          duration={3000}
          onExited={() => {
            this.onExitedMessage();
          }}
        />

        <Loading show={this.state.loading} />

        <Row>
          <h1>Crear Producto</h1>
        </Row>
        <Row>
          <Form>
          <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Codigo producto</Form.Label>
              <Form.Control
                value={this.state.producto.codigo}
                onChange={(e) => this.setValue("codigo", e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Nombre Producto</Form.Label>
              <Form.Control
                value={this.state.producto.nombre}
                onChange={(e) => this.setValue("nombre", e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Categoria</Form.Label>
              <Form.Control
                value={this.state.producto.categoria}
                onChange={(e) => this.setValue("categoria", e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                value={this.state.producto.precio}
                onChange={(e) => this.setValue("precio", e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Cantidad</Form.Label>
              <Form.Control
                value={this.state.producto.cantidad}
                onChange={(e) => this.setValue("cantidad", e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Stock Minimo</Form.Label>
              <Form.Control
                value={this.state.producto.stockMinimo}
                onChange={(e) => this.setValue("stockMinimo", e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" onClick={() => this.guardarProductos()}>
              Guardar Producto
            </Button>
          </Form>
        </Row>
      </Container>
    );
  }
}
