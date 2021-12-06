import React from "react";
import { request } from "../../helper/helper";
import { Container, Form, Row, Button } from "react-bootstrap";
import Loading from "../../loading/loading";
import MessagePrompt from "../../prompts/message";

import confirmationPrompts from "../../prompts/confirmation";

export default class ProveedoresEditar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idVenta: this.props.getIdVenta(),
      redirect: false,
      message: {
        text: "",
        show: false,
      },
      cofirmation: {
        title: "Modificar venta",
        text: "¿Esta seguro de modificar el venta?",
        show: false,
      },
      loading: false,
      venta: {
        fecha: "",
        codigo_ref: "",
        cantidad: "",
        precio_total: "",
        descuento: "",
      },
      // producto: {
      //   codigo: "",
      //   nombre: "",
      //   categoria: "",
      //   precio: "",
      //   cantidad: "",
      //   stockMinimo: "",
      // },
    };
    this.onExitedMessage = this.onExitedMessage.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
  }

  componentDidMount() {
    this.getVenta();
  }

  getVenta() {
    this.setState({ loading: true });
    request
      .get(`/ventas/${this.state.idVenta}`)
      .then((response) => {
        console.log(response);
        this.setState({
          venta: response.data,
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
      venta: {
        ...this.state.venta,
        [index]: value,
      },
    });
  }

  guardarVentas() {
    this.setState({ loading: true });
    request
      .post("/ventas", this.state.venta)
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
        console.error(error);
        this.setState({ loading: true });
      });
  }

  onExitedMessage() {
    if (this.state.redirect) {
      this.props.changeTab("buscar");
    }
  }

  onCancel() {
    this.setState({
      confirmation: {
        ...this.state.confirmation,
        show: false,
      },
    });
  }

  onConfirm() {
    this.setState(
      {
        confirmation: {
          ...this.state.confirmation,
          show: false,
        },
      },
      this.guardarVentas()
    );
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      show: nextProps.show,
      title: nextProps.title,
      text: nextProps.text,
    });
  }

  
  render() {
    return (
      <Container id="ventas-crear-container">
        <MessagePrompt
          text={this.state.message.text}
          show={this.state.message.show}
          duration={2000}
          onExited={this.onExitedMessage}
        />

        <confirmationPrompts
          show={this.state.confirmation.show}
          title={this.state.confirmation.title}
          text={this.state.confirmation.text}
          onCancel={() => {
            this.onCancel();
          }}
          onConfirm={() => {
            this.onConfirm();
          }}
        />

        <Loading show={this.state.loading} />

        <Row>
          <h1>Editar Producto</h1>
        </Row>
        <Row>
        <Form>
            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Fecha</Form.Label>
              <Form.Control
                value={this.state.venta.nombre}
                onChange={(e) => this.setValue("nombre", e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Codigo Referencia</Form.Label>
              <Form.Control
                value={this.state.venta.apellido_p}
                onChange={(e) => this.setValue("apellido_p", e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Cantidad</Form.Label>
              <Form.Control
                value={this.state.venta.apellido_m}
                onChange={(e) => this.setValue("apellido_m", e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Precio Total</Form.Label>
              <Form.Control
                value={this.state.venta.telefono}
                onChange={(e) => this.setValue("telefono", e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Descuento</Form.Label>
              <Form.Control
                value={this.state.venta.mail}
                onChange={(e) => this.setValue("mail", e.target.value)}
              />
            </Form.Group>

            <Button
              variant="primary"
              onClick={() =>
                this.setState({
                  confirmation: { ...this.state.confirmation, show: true },
                })
              }
            >
              Guardar Venta
            </Button>
          </Form>
          {/* <Form>
            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Codigo producto</Form.Label>
              <Form.Control
                value={this.state.venta.codigo}
                onChange={(e) => this.setValue("codigo", e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Nombre Producto</Form.Label>
              <Form.Control
                value={this.state.venta.nombre}
                onChange={(e) => this.setValue("nombre", e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Categoria</Form.Label>
              <Form.Control
                value={this.state.venta.categoria}
                onChange={(e) => this.setValue("categoria", e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                value={this.state.venta.precio}
                onChange={(e) => this.setValue("precio", e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Cantidad</Form.Label>
              <Form.Control
                value={this.state.venta.cantidad}
                onChange={(e) => this.setValue("cantidad", e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Stock Minimo</Form.Label>
              <Form.Control
                value={this.state.venta.stockMinimo}
                onChange={(e) => this.setValue("stockMinimo", e.target.value)}
              />
            </Form.Group>

            <Button
              variant="primary"
              onClick={() =>
                this.setState({
                  confirmation: { ...this.state.confirmation, show: true },
                })
              }
            >
              Guardar Producto
            </Button>
          </Form> */}
        </Row>
      </Container>
    );
  }
}
