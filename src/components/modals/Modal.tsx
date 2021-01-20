import React from "react";

import ModalDialog from "./ModalDialog";

type ForwardedProps = "appElement" | "className" | "contentRef" | "entrance" | "width";
type ModalProps = Pick<React.ComponentProps<typeof ModalDialog>, ForwardedProps> & {
  ariaLabelledBy?: string;
  ariaDescribedby?: string;
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

  getChildren(): React.ReactNode {
    const { children } = this.props;

    return React.Children.map(children, child => {
      if (React.isValidElement(child) && child.type === ModalDialog.Heading) {
        return React.cloneElement(child, { onClose: this.handleClose });
      }
      return child;
    });
  }

  handleOpen = (): void => {
    this.setState({ open: true });
  };

  handleClose = (): void => {
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

  render(): React.ReactElement {
    const {
      appElement,
      ariaLabelledBy,
      ariaDescribedby,
      className,
      contentRef,
      entrance,
      trigger,
      width
    } = this.props;
    const { open } = this.state;

    return (
      <>
        {trigger(this.handleOpen)}
        {open && (
          <ModalDialog
            ariaLabelledBy={ariaLabelledBy}
            ariaDescribedby={ariaDescribedby}
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
