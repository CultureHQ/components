import React, { Component } from "react";

import classnames from "../classnames";
import Button from "./Button";
import Cheer from "./Cheer";

class CheerButton extends Component {
  state = { toggling: false };

  handleClick = () => {
    this.setState({ toggling: true });

    const { cheered, onCheerToggle } = this.props;

    onCheerToggle(!cheered).then(() => {
      this.setState({ toggling: false });
    });
  };

  render() {
    const { children, cheered, className, onCheerToggle } = this.props;
    const { toggling } = this.state;

    return (
      <button
        type="button"
        className={classnames("chq-cbn", className, { "chq-cbn-ch": cheered })}
        disabled={toggling}
        onClick={this.handleClick}
      >
        <Cheer /> Cheer!
      </button>
    );
  }
}

export default CheerButton;
