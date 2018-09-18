import React, { Component, Fragment } from "react";

import { Button, Modal } from "../../src";
import { TEXT } from "./utils";

class ModalContainer extends Component {
  state = { open: false };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { children, entrance } = this.props;
    const { open } = this.state;

    return (
      <Fragment>
        <Button onClick={this.handleOpen}>{children}</Button>
        {open && (
          <Modal entrance={entrance} onClose={this.handleClose}>
            <Modal.Heading>Chapter 1</Modal.Heading>
            <Modal.Body>{TEXT}</Modal.Body>
          </Modal>
        )}
      </Fragment>
    );
  }
}

export default ModalContainer;
