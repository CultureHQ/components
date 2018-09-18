import React, { Component } from "react";

import { CheerButton } from "../../src";

class CheerButtonContainer extends Component {
  constructor(props) {
    super(props);

    this.state = { cheered: props.cheered || false };
  }

  handleCheerToggle = cheered => {
    this.setState({ cheered });

    return new Promise(resolve => setTimeout(() => resolve(), 500));
  };

  render() {
    const { name, small } = this.props;
    const { cheered } = this.state;

    return (
      <CheerButton
        cheered={cheered}
        name={name}
        small={small}
        onCheerToggle={this.handleCheerToggle}
      />
    );
  }
}

export default CheerButtonContainer;
