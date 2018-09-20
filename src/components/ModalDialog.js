import React from "react";
import ReactModal from "react-modal";

import classnames from "../classnames";

import Icon from "./Icon";
import Panel from "./Panel";
import PlainButton from "./PlainButton";

const entrances = {
  slideIn: "chq-mdl-si",
  zoomIn: "chq-mdl-zi"
};

const ModalDialogHeading = ({ children, className, onClose }) => (
  <Panel.Heading primary className={className}>
    {children}
    <PlainButton className="chq-mdl--cl" onClick={onClose}>
      <Icon icon="ios-close-empty" />
    </PlainButton>
  </Panel.Heading>
);

const ModalDialog = ({ children, className, contentRef, entrance = "slideIn", onClose }) => (
  <ReactModal
    className={classnames("chq-mdl", className, entrances[entrance])}
    contentRef={contentRef}
    onRequestClose={onClose}
    isOpen
    style={{
      overlay: {
        backgroundColor: "rgba(0, 0, 0, .3)",
        zIndex: 2147483647
      }
    }}
  >
    {children}
  </ReactModal>
);

Object.assign(ModalDialog, {
  setAppElement: ReactModal.setAppElement,
  Heading: ModalDialogHeading,
  Body: Panel.Body,
  LoaderBody: Panel.LoaderBody,
  Footer: Panel.Footer
});

export default ModalDialog;
