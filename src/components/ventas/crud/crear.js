import React from "react";
import { request } from "../../helper/helper";
import { Container, Form, Row, Button } from "react-bootstrap";
import Loading from "../../loading/loading";
import MessagePrompt from "../../prompts/message";

export default class VentasCrear extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      message: {
        text: "",
        show: false,
      },
      loading: false,
      Venta: {
        fecha: "",
        codigo_ref: "",
        cantidad: "",
        precio_total: "",
        descuento: "",
      },
    };
    this.onExitedMessage = this.onExitedMessage.bind(this);
  }

  setValue(index, value) {
    this.setState({
      Venta: {
        ...this.state.Venta,
        [index]: value,
      },
    });
  }

  guardarVentas() {
    console.log(this.state.Ventas);
    this.setState({ loading: true });
    request
      .post("/Ventas", this.state.Venta)
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
      <Container id="Ventas-crear-container">
        <MessagePrompt
          text={this.state.message.text}
          show={this.state.message.show}
          duration={3000}
          onExited={this.onExitedMessage}
        />

        <Loading show={this.state.loading} />

        <Row>
          <h1>Crear Venta</h1>
        </Row>
        <Row>
        <Form>
            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Fecha</Form.Label>
              <Form.Control
                onChange={(e) => this.setValue("fecha", e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Codigo referencia</Form.Label>
              <Form.Control
                onChange={(e) => this.setValue("codigo_ref", e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Cantidad</Form.Label>
              <Form.Control
                onChange={(e) => this.setValue("cantidad", e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Precio Total</Form.Label>
              <Form.Control
                onChange={(e) => this.setValue("precio_total", e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Descuento</Form.Label>
              <Form.Control
                onChange={(e) => this.setValue("descuento", e.target.value)}
              />
            </Form.Group>

            <Button
              variant="primary"
              onClick={() => this.guardarVentas()}
            >
              Guardar Venta
            </Button>
          </Form>

        </Row>
      </Container>
    );
  }
}
