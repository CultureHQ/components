import React from "react";
import { default as ReactModal } from "react-modal";

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

const Modal = ({ children, className, entrance = "slideIn", onClose }) => (
  <ReactModal
    className={classnames("chq-mdl", className, entrances[entrance])}
    onRequestClose={onClose}
    isOpen
    style={styles}
  >
    {children}
  </ReactModal>
);

const ModalHeading = ({ children, className, onClose }) => (
  <Panel.Heading primary>
    {children}
    <PlainButton className="chq-mdl--cl" onClick={onClose}>
      <Icon icon="ios-close-empty" />
    </PlainButton>
  </Panel.Heading>
);

Object.assign(Modal, {
  setAppElement: ReactModal.setAppElement,
  Heading: ModalHeading,
  Body: Panel.Body,
  LoaderBody: Panel.LoaderBody,
  Footer: Panel.Footer
});

export default Modal;
