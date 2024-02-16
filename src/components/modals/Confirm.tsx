import React from "react";

import classnames from "../../classnames";
import Button from "../buttons/Button";
import ModalDialog from "./ModalDialog";

type ForwardedProps = "appElement" | "children" | "className" | "contentRef" | "disclaimer" | "entrance" | "width";
type ConfirmProps = Pick<React.ComponentProps<typeof ModalDialog>, ForwardedProps> & {
  accept?: string;
  danger?: boolean;
  onAccept: (event?: React.MouseEvent<HTMLButtonElement>) => void;
  onOpen?: () => void;
  startOpen?: boolean;
  trigger: (onTrigger: () => void) => React.ReactNode;
  registerModal?: (isOpen: boolean) => void;
};

type ConfirmState = {
  open: boolean;
};

class Confirm extends React.Component<ConfirmProps, ConfirmState> {
  constructor(props: ConfirmProps) {
    super(props);

    this.state = { open: props.startOpen || false };
  }

  handleOpen = (): void => {
    const { onOpen } = this.props;

    if (onOpen) {
      onOpen();
    }

    this.setState({ open: true });
  };

  handleClose = (): void => {
    this.setState({ open: false });
  };

  handleCloseFromButton = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.stopPropagation();
    this.handleClose();
  };

  handleAccept = (event: React.MouseEvent<HTMLButtonElement>): void => {
    const { onAccept } = this.props;

    this.setState({ open: false });
    onAccept(event);
  };

  render(): React.ReactElement {
    const { accept = "Yes", appElement, children, className,
      contentRef, danger, disclaimer, entrance, trigger, width, registerModal } = this.props;
    const { open } = this.state;

    const classList = classnames("chq-cnf", className);

    return (
      <>
        {trigger(this.handleOpen)}
        {open && (
          <ModalDialog
            appElement={appElement}
            className={classList}
            contentRef={contentRef}
            entrance={entrance}
            width={width}
            onClose={this.handleClose}
            registerModal={registerModal}
          >
            <ModalDialog.Body>
              {children}
              {disclaimer && (<div className="chq-cnf-disclaimer">{disclaimer}</div>)}
            </ModalDialog.Body>
            <ModalDialog.Footer>
              <div>
                <Button inverted onClick={this.handleCloseFromButton}>Cancel</Button>
              </div>
              <div>
                <Button autoFocus primary danger={danger} onClick={this.handleAccept}>
                  {accept}
                </Button>
              </div>
            </ModalDialog.Footer>
          </ModalDialog>
        )}
      </>
    );
  }
}

export const ConfirmDelete: React.FC<ConfirmProps> = props => (
  <Confirm accept="Delete" danger {...props} />
);

export default Confirm;
