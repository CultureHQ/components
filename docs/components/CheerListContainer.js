import React, { Component } from "react";

import { CheerList } from "../../src";

class CheerListContainer extends Component {
  state = { cheered: false };

  handleCheerToggle = cheered => {
    this.setState({ cheered });

    return new Promise(resolve => setTimeout(() => resolve(), 1000));
  };

  render() {
    const { cheers, name } = this.props;
    const { cheered } = this.state;

    return (
      <CheerList
        cheered={cheered}
        cheers={cheers}
        name={name}
        onCheerToggle={this.handleCheerToggle}
      />
    );
  }
}

export default CheerListContainer;
