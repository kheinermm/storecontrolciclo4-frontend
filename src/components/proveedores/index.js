import React from "react";
import { Container, Nav, Row } from "react-bootstrap";
import ProveedoresBuscar from "./crud/buscar";
import ProveedoresCrear from "./crud/crear";
import ProveedoresEditar from "./crud/editar";
import "./proveedores.css";

export default class Proveedores extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: "buscar",
      _id: null,
    };
    this.changeTab = this.changeTab.bind(this);
    this.setIdProveedor = this.setIdProveedor.bind(this);
    this.getIdProveedor = this.getIdProveedor.bind(this);
  }

  changeTab(tab) {
    this.setState({ currentTab: tab });
  }

  setIdProveedor(id) {
    this.setState({ _id: id });
  }

  getIdProveedor() {
    return this.state._id;
  }

  render() {
    return (
      <Container id="proveedores-container">
        <Row>
          <Nav
          
            variant="tabs"
            defaultActiveKey="/buscar"
            onSelect={(eventKey) => this.setState({ currentTab: eventKey })}
          >
            <Nav.Item>
              <Nav.Link eventKey="buscar">Buscar</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="crear">Crear</Nav.Link>
            </Nav.Item>
          </Nav>
        </Row>
        <Row>
          {this.state.currentTab === "buscar" ? (
            <ProveedoresBuscar
              changeTab={this.changeTab}
              setIdProveedor={this.setIdProveedor}
            />
          ) : this.state.currentTab === "crear" ? (
            <ProveedoresCrear changeTab={this.changeTab} />
          ) : (
            <ProveedoresEditar
              changeTab={this.changeTab}
              getIdProveedor={this.getIdProveedor}
            />
          )}
        </Row>
      </Container>
    );
  }
}
