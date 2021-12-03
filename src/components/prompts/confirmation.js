import React from "react";
import { Modal, Button } from "react-bootstrap";

export default class confirmationPrompts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      title: "",
      text: "",
    };
  }
  render() {
    return (
      <Modal show={this.state.show} centered>
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Modal body text goes here.</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary">Cancelar</Button>
          <Button variant="primary">Confirmar</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
