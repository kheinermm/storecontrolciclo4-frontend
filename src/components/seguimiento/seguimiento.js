import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./seguimiento.css";
import DataGrid from "../grid/grid";
import Loading from "../loading/loading";
import MessagePrompt from "../prompts/message";

const columns = [

  {
    dataField: "_id",
    text: "ID",
    hidden: true,
  },
  {
    dataField: "codigo",
    text: "Codigo Producto",
    sort: true,
  },
  {
    dataField: "nombre",
    text: "Nombre Producto",
    sort: true,
  },
  {
    dataField: "categoria",
    text: "Categoria",
    sort: true,
  },
  {
    dataField: "precio",
    text: "Precio",
  },
  {
    dataField: "cantidad",
    text: "Cantidad",
  },
  {
    dataField: "stockMinimo",
    text: "Stock Minimo",
  },
];

export default class ProveedoresBuscar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      message: {
        text: "",
        show: false,
      },
    };
    this.onExitedMessage = this.onExitedMessage.bind(this);
  }

  onExitedMessage() {
    this.props.changeTab("buscar");
  }

  reloadPage() {
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }

  render() {
    return (
      <Container id="proveedores-buscar-container">

        <MessagePrompt
          text={this.state.message.text}
          show={this.state.message.show}
          duration={2000}
          onExited={this.onExitedMessage}
        />

        <Loading show={this.props.loading} />

        <Row>
          <h1>SEGUIMIENTO Y NOVEDADES</h1>
          <hr />
        </Row>
        <Row>
          <DataGrid
            url="/productos"
            columns={columns}
          />
        </Row>
      </Container>
    );
  }
}
