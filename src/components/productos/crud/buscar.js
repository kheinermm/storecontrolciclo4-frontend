import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../productos.css";
import DataGrid from "../../grid/grid";
import ConfirmationPrompts from "../../prompts/confirmation";
import Loading from "../../loading/loading";
import MessagePrompt from "../../prompts/message";

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

export default class ProductosBuscar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idEmpleado: null,
      loading: false,
      confirmation: {
        title: "Eliminar Empleado",
        text: "¿Esta seguro de eliminar el producto?",
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
    this.props.showIdEmpleado(row._id);
    this.props.changeTab("editar");
  }

  onClickDeleteButton(row) {
    this.setState({
      idEmpleado: row._id,
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
      this.eliminarEmpleado()
    );
  }

  onExitedMessage() {
    this.props.changeTab("buscar");
  }

  eliminarEmpleado() {
    this.setState({ loading: true });
    request
      .delete(`/productos/${this.state.idEmpleado}`)
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
      <Container id="productos-buscar-container">
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
          <h1>Buscar Productos</h1>
          <hr />
        </Row>
        <Row>
          <DataGrid
            url="/productos"
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