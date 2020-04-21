import React from "react";

import ModalDialog from "./ModalDialog";

type ForwardedProps = "appElement" | "className" | "contentRef" | "entrance" | "width";
type ModalProps = Pick<React.ComponentProps<typeof ModalDialog>, ForwardedProps> & {
  onClose?: () => void;
  startOpen?: boolean;
  trigger: (onTrigger: () => void) => React.ReactNode;
};

type ModalState = {
  open: boolean;
};

class Modal extends React.Component<ModalProps, ModalState> {
  constructor(props: ModalProps) {
    super(props);

    this.state = { open: props.startOpen || false };
  }

  static getDerivedStateFromProps(props: any, state: any) {
    return {
      ...state,
      open: props.startOpen || state.open
    };
  }

  getChildren() {
    const { children } = this.props;

    return React.Children.map(children, child => {
      if (React.isValidElement(child) && child.type === ModalDialog.Heading) {
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

    if (onClose) {
      onClose();
    }
  };

  static Heading = ModalDialog.Heading;

  static Body = ModalDialog.Body;

  static LoaderBody = ModalDialog.LoaderBody;

  static Footer = ModalDialog.Footer;

  render() {
    const { appElement, className, contentRef, entrance, trigger, width } = this.props;
    const { open } = this.state;

    return (
      <>
        {trigger(this.handleOpen)}
        {open && (
          <ModalDialog
            appElement={appElement}
            className={className}
            contentRef={contentRef}
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

export default Modal;
