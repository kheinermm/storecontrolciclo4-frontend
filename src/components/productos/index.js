import React from "react";
import { Container, Nav, Row } from "react-bootstrap";
import ProductosBuscar from "./crud/buscar";
import ProductosCrear from "./crud/crear";
import ProductosEditar from "./crud/editar";
import "./productos.css";

export default class Productos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: "buscar",
      _id: null,
    };
    this.changeTab = this.changeTab.bind(this);
    this.setIdProducto = this.setIdProducto.bind(this);
    this.getIdProducto = this.getIdProducto.bind(this);
  }

  changeTab(tab) {
    this.setState({ currentTab: tab });
  }

  setIdProducto(id) {
    this.setState({ _id: id });
  }

  getIdProducto() {
    return this.state._id;
  }

  render() {
    return (
      <Container id="productos-container">
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
            <ProductosBuscar
              changeTab={this.changeTab}
              setIdProducto={this.setIdProducto}
            />
          ) : this.state.currentTab === "crear" ? (
            <ProductosCrear changeTab={this.changeTab} />
          ) : (
            <ProductosEditar
              changeTab={this.changeTab}
              getIdProducto={this.getIdProducto}
            />
          )}
        </Row>
      </Container>
    );
  }
}
