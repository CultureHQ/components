import React from "react";

import classnames from "../../classnames";

import PlainButton from "../buttons/PlainButton";
import Icon from "../Icon";
import Panel from "../Panel";

// This shouldn't be necessary, but is due to
// https://github.com/reactjs/react-modal/issues/497
const ReactModal = require("react-modal");

const entrances = {
  slideIn: "chq-mdl-si",
  zoomIn: "chq-mdl-zi"
};

const widths = {
  narrow: "chq-mdl-wr",
  normal: "chq-mdl-wn"
};

type ModalDialogHeadingProps = React.ComponentProps<typeof Panel.Heading> & {
  children: React.ReactNode;
  className?: string;
  bigCloseIcon?: boolean
  onClose?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const ModalDialogHeading: React.FC<ModalDialogHeadingProps> = ({
  children,
  bigCloseIcon,
  onClose,
  ...props
}) => (
  <Panel.Heading primary {...props}>
    {children}
    <PlainButton aria-label="Close" className="chq-mdl--cl" onClick={onClose}>
      <Icon icon={bigCloseIcon ? "close" : "ios-close-empty"} />
    </PlainButton>
  </Panel.Heading>
);

const modalStyle = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, .3)",
    zIndex: 2147483647
  }
};

type ModalDialogProps = {
  appElement?: string | HTMLElement;
  children: React.ReactNode;
  className?: string;
  contentRef?: React.Ref<HTMLDivElement>;
  entrance?: keyof typeof entrances;
  onClose?: (event: (React.MouseEvent | React.KeyboardEvent)) => void;
  width?: keyof typeof widths;
};

type ModalDialogComponent = React.FC<ModalDialogProps> & {
  Heading: typeof ModalDialogHeading;
  Body: typeof Panel.Body;
  LoaderBody: typeof Panel.LoaderBody;
  Footer: typeof Panel.Footer;
};

const ModalDialog: ModalDialogComponent = ({
  appElement = document.body,
  children,
  className,
  contentRef,
  entrance = "slideIn",
  onClose,
  width = "normal"
}) => (
  <ReactModal
    appElement={appElement}
    className={classnames("chq-mdl", className, entrances[entrance], widths[width])}
    contentRef={contentRef}
    onRequestClose={onClose}
    isOpen
    style={modalStyle}
  >
    {children}
  </ReactModal>
);

ModalDialog.Heading = ModalDialogHeading;
ModalDialog.Body = Panel.Body;
ModalDialog.LoaderBody = Panel.LoaderBody;
ModalDialog.Footer = Panel.Footer;

export default ModalDialog;
