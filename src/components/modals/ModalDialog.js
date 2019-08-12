import React from "react";
import ReactModal from "react-modal";

import classnames from "../../classnames";

import PlainButton from "../buttons/PlainButton";
import Icon from "../Icon";
import Panel from "../Panel";

const entrances = {
  slideIn: "chq-mdl-si",
  zoomIn: "chq-mdl-zi"
};

const widths = {
  narrow: "chq-mdl-wr",
  normal: "chq-mdl-wn"
};

const ModalDialogHeading = ({ children, className, onClose }) => (
  <Panel.Heading primary className={className}>
    {children}
    <PlainButton aria-label="Close" className="chq-mdl--cl" onClick={onClose}>
      <Icon icon="ios-close-empty" />
    </PlainButton>
  </Panel.Heading>
);

const modalStyle = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, .3)",
    zIndex: 2147483647
  }
};

const ModalDialog = ({ children, className, contentRef, entrance = "slideIn", onClose, width = "normal" }) => (
  <ReactModal
    className={classnames("chq-mdl", className, entrances[entrance], widths[width])}
    contentRef={contentRef}
    onRequestClose={onClose}
    isOpen
    style={modalStyle}
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
