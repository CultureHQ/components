import React, { Component } from "react";

import { CheerButton } from "../../src";

class CheerButtonContainer extends Component {
  state = { cheered: false };

  handleCheerToggle = cheered => {
    this.setState({ cheered });

    return new Promise(resolve => setTimeout(() => resolve(), 1000));
  };

  render() {
    const { cheered } = this.state;

    return (
      <CheerButton
        cheered={cheered}
        onCheerToggle={this.handleCheerToggle}
      />
    );
  }
}

export default CheerButtonContainer;
