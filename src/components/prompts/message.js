import React from "react";
import { Modal } from "react-bootstrap";
import "./prompts.css";

export default class MessagePrompt extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.show) {
      this.setState({ show: true }, this.hideMessage());
    }
  }

  hideMessage() {
    setTimeout(() => {
      this.setState({ show: false });
    }, this.props.duration);
  }

  render() {
    return (
      <Modal id="message-prompt" centered show={this.state.show}>
        <Modal.Body>{this.props.text}</Modal.Body>
      </Modal>
    );
  }
}
