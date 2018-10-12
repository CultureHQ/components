import React, { Component } from "react";

import classnames from "../../classnames";
import Button from "../buttons/Button";
import ModalDialog from "./ModalDialog";

class Confirm extends Component {
  constructor(props) {
    super(props);

    this.state = { open: props.startOpen || false };
  }

  handleOpen = () => {
    const { onOpen } = this.props;

    if (onOpen) {
      onOpen();
    }

    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleAccept = () => {
    const { onAccept } = this.props;

    this.setState({ open: false });
    onAccept();
  };

  render() {
    const { accept = "Yes", children, className, contentRef, danger, entrance, trigger } = this.props;
    const { open } = this.state;

    const classList = classnames("chq-cnf", className);

    return (
      <>
        {trigger(this.handleOpen)}
        {open && (
          <ModalDialog
            className={classList}
            contentRef={contentRef}
            entrance={entrance}
            onClose={this.handleClose}
          >
            <ModalDialog.Body>{children}</ModalDialog.Body>
            <ModalDialog.Footer>
              <div>
                <Button inverted onClick={this.handleClose}>Cancel</Button>
              </div>
              <div>
                <Button primary danger={danger} onClick={this.handleAccept}>{accept}</Button>
              </div>
            </ModalDialog.Footer>
          </ModalDialog>
        )}
      </>
    );
  }
}

export const ConfirmDelete = props => (
  <Confirm accept="Delete" danger {...props} />
);

export default Confirm;
