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
      <Modal
        show={this.state.show}
        centered
        onHide={() => this.props.onCancel()}
      >
        <Modal.Header closeButton>
          <Modal.Title>{this.state.title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>{this.state.text}</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary">Cancelar</Button>
          <Button variant="primary">Confirmar</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
