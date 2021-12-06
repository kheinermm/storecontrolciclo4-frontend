import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "../ventas.css";
import DataGrid from "../../grid/grid";
import ConfirmationPrompts from "../../prompts/confirmation";
import Loading from "../../loading/loading";
import MessagePrompt from "../../prompts/message";
import { request } from "../../helper/helper";

const columns = [
  {
    dataField: "_id",
    text: "ID",
    hidden: true,
  },
  {
    dataField: "fecha",
    text: "Fecha",
    sort: true,
  },
  {
    dataField: "codigo_ref",
    text: "Codigo Referencia",
    sort: true,
  },
  {
    dataField: "cantidad",
    text: "Cantidad",
  },
  {
    dataField: "precio_total",
    text: "Precio Total",
  },
  {
    dataField: "descuento",
    text: "Descuento",
  },
];

export default class VentasBuscar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idVenta: null,
      loading: false,
      confirmation: {
        title: "Eliminar Venta",
        text: "¿Esta seguro de eliminar el venta?",
        show: false,
      },
      message: {
        text: "",
        show: false,
      },
    };
    this.onClickEditButton = this.onClickEditButton.bind(this);
    this.onClickDeleteButton = this.onClickDeleteButton.bind(this);
    this.onExitedMessage = this.onExitedMessage.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
  }

  onClickEditButton(row) {
    //this.props.showIdVenta(row._id);
    this.props.changeTab("editar");
  }

  onClickDeleteButton(row) {
    this.setState({
      idVenta: row._id,
      confirmation: {
        ...this.state.confirmation,
        show: true,
      },
    });
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
      this.eliminarVenta()
    );
  }

  onExitedMessage() {
    this.props.changeTab("buscar");
  }

  eliminarVenta() {
    this.setState({ loading: true });
    request
      .delete(`/ventas/${this.state.idVenta}`)
      .then((response) => {
        this.setState({
          loading: false,
          message: {
            text: response.data.msg,
            show: true,
          },
        });
        if (response.data.exito) {
          this.reloadPage();
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({ loading: false });
      });
  }

  reloadPage() {
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }

  render() {
    return (
      <Container id="ventas-buscar-container">
        <ConfirmationPrompts
          show={this.state.confirmation.show}
          title={this.state.confirmation.title}
          text={this.state.confirmation.text}
          onCancel={this.onCancel}
          onConfirm={this.onConfirm}
        />

        <MessagePrompt
          text={this.state.message.text}
          show={this.state.message.show}
          duration={2000}
          onExited={this.onExitedMessage}
        />

        <Loading show={this.props.loading} />

        <Row>
          <h1>Buscar Ventas</h1>
          <hr />
        </Row>
        <Row>
          <DataGrid
            url="/ventas"
            columns={columns}
            showEditButton={true}
            showDeleteButton={true}
            onClickEditButton={this.onClickEditButton}
            onClickDeleteButton={this.onClickDeleteButton}
          />
        </Row>
      </Container>
    );
  }
}
