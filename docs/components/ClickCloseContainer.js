import React, { Component } from "react";

import { ClickClose, PlainButton } from "../../src";

class ClickCloseContainer extends Component {
  state = { open: false };

  handleClose = () => {
    const { open } = this.state;

    if (open) {
      this.setState({ open: false });
    }
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  render() {
    const { open } = this.state;

    return (
      <ClickClose onClose={this.handleClose}>
        <PlainButton onClick={this.handleOpen}>
          Click me!
        </PlainButton>
        {open && <div>Open!</div>}
      </ClickClose>
    );
  }
}

export default ClickCloseContainer;
