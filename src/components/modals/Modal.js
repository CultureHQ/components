import React, { Component } from "react";

import ModalDialog from "./ModalDialog";

class Modal extends Component {
  constructor(props) {
    super(props);

    this.state = { open: props.startOpen };
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
    const { onClose } = this.props;

    this.setState({ open: false });
    onClose();
  };

  render() {
    const { className, entrance, trigger, width } = this.props;
    const { open } = this.state;

    return (
      <>
        {trigger(this.handleOpen)}
        {open && (
          <ModalDialog
            className={className}
            entrance={entrance}
            onClose={this.handleClose}
            width={width}
          >
            {this.getChildren()}
          </ModalDialog>
        )}
      </>
    );
  }
}

Modal.defaultProps = {
  onClose: () => {},
  startOpen: false
};

Object.assign(Modal, {
  setAppElement: ModalDialog.setAppElement,
  Heading: ModalDialog.Heading,
  Body: ModalDialog.Body,
  LoaderBody: ModalDialog.LoaderBody,
  Footer: ModalDialog.Footer
});

export default Modal;
