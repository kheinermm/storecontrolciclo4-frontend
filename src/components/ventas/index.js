import React from "react";
import { Container, Nav, Row } from "react-bootstrap";
import VentasBuscar from "./crud/buscar";
import VentasCrear from "./crud/crear";
import VentasEditar from "./crud/editar";
import "./ventas.css";

export default class Ventas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: "buscar",
      _id: null,
    };
    this.changeTab = this.changeTab.bind(this);
    this.setIdVenta = this.setIdVenta.bind(this);
    this.getIdVenta = this.getIdVenta.bind(this);
  }

  changeTab(tab) {
    this.setState({ currentTab: tab });
  }

  setIdVenta(id) {
    this.setState({ _id: id });
  }

  getIdVenta() {
    return this.state._id;
  }

  render() {
    return (
      <Container id="ventas-container">
        <Row>
          <Nav
            fill
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
            <VentasBuscar
              changeTab={this.changeTab}
              setIdVenta={this.setIdVenta}
            />
          ) : this.state.currentTab === "crear" ? (
            <VentasCrear changeTab={this.changeTab} />
          ) : (
            <VentasEditar
              changeTab={this.changeTab}
              getIdVenta={this.getIdVenta}
            />
          )}
        </Row>
      </Container>
    );
  }
}
