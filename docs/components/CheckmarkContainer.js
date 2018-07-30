import React, { Component } from "react";

import { Checkmark } from "../../src";

class CheckmarkContainer extends Component {
  state = { checked: false };

  handleClick = checked => {
    this.setState({ checked });
  };

  render() {
    const { checked } = this.state;

    return <Checkmark checked={checked} onClick={this.handleClick} />;
  }
}

export default CheckmarkContainer;
