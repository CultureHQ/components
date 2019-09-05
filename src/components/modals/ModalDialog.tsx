import * as React from "react";
import * as ReactModal from "react-modal";

import classnames from "../../classnames";
import { HTMLContainerProps } from "../../types";

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

type ModalDialogHeadingProps = HTMLContainerProps & {
  onClose?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const ModalDialogHeading = ({ children, className, onClose }: ModalDialogHeadingProps) => (
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

type ModalDialogProps = HTMLContainerProps & {
  contentRef?: (instance: HTMLDivElement) => void;
  entrance?: keyof typeof entrances;
  onClose?: (event: (React.MouseEvent | React.KeyboardEvent)) => void;
  width?: keyof typeof widths;
};

const ModalDialog = ({ children, className, contentRef, entrance = "slideIn", onClose, width = "normal" }: ModalDialogProps) => (
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

ModalDialog.setAppElement = ReactModal.setAppElement;
ModalDialog.Heading = ModalDialogHeading;
ModalDialog.Body = Panel.Body;
ModalDialog.LoaderBody = Panel.LoaderBody;
ModalDialog.Footer = Panel.Footer;

export default ModalDialog;
