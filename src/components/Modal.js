import React, { Component, Fragment } from "react";

import ModalDialog from "./ModalDialog";

class Modal extends Component {
  constructor(props) {
    super(props);

    this.state = { open: props.startOpen || false };
  }

  getChildren() {
    const { children } = this.props;

    return React.Children.map(children, child => {
      if (child.type === Modal.Heading) {
        return React.cloneElement(child, { onClose: this.handleClose });
      }
      return child;
    });
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { className, entrance, trigger } = this.props;
    const { open } = this.state;

    return (
      <Fragment>
        {trigger(this.handleOpen)}
        {open && (
          <ModalDialog className={className} entrance={entrance} onClose={this.handleClose}>
            {this.getChildren()}
          </ModalDialog>
        )}
      </Fragment>
    );
  }
}

Object.assign(Modal, {
  setAppElement: ModalDialog.setAppElement,
  Heading: ModalDialog.Heading,
  Body: ModalDialog.Body,
  LoaderBody: ModalDialog.LoaderBody,
  Footer: ModalDialog.Footer
});

export default Modal;
