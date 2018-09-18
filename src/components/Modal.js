import React, { Component, Fragment } from "react";
import ReactModal from "react-modal";

import classnames from "../classnames";

import Icon from "./Icon";
import Panel from "./Panel";
import PlainButton from "./PlainButton";

const styles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, .3)",
    zIndex: 2147483647
  }
};

const entrances = {
  slideIn: "chq-mdl-si",
  zoomIn: "chq-mdl-zi"
};

const ModalHeading = ({ children, className, onClose }) => (
  <Panel.Heading primary className={className}>
    {children}
    <PlainButton className="chq-mdl--cl" onClick={onClose}>
      <Icon icon="ios-close-empty" />
    </PlainButton>
  </Panel.Heading>
);

class Modal extends Component {
  state = { open: false };

  getChildren() {
    const { children } = this.props;

    return React.Children.map(children, child => {
      if (child.type === ModalHeading) {
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
    const { className, entrance = "slideIn", trigger } = this.props;
    const { open } = this.state;

    return (
      <Fragment>
        {trigger(this.handleOpen)}
        {open && (
          <ReactModal
            className={classnames("chq-mdl", className, entrances[entrance])}
            onRequestClose={this.handleClose}
            isOpen
            style={styles}
          >
            {this.getChildren()}
          </ReactModal>
        )}
      </Fragment>
    );
  }
}

Object.assign(Modal, {
  setAppElement: ReactModal.setAppElement,
  Heading: ModalHeading,
  Body: Panel.Body,
  LoaderBody: Panel.LoaderBody,
  Footer: Panel.Footer
});

export default Modal;
