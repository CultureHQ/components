import React, { Component } from "react";

import { Hamburger } from "../../src";

class HamburgerContainer extends Component {
  constructor(props) {
    super(props);

    this.state = { open: props.open };
  }

  handleToggle = () => {
    this.setState(({ open }) => ({ open: !open }));
  };

  render() {
    const { open } = this.state;

    return (
      <div className="ham-wrap">
        <Hamburger open={open} onToggle={this.handleToggle} />{" "}
        {open ? "Open" : "Closed"}
      </div>
    );
  }
}

export default HamburgerContainer;
