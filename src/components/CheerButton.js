import React, { Component } from "react";

import classnames from "../classnames";
import Cheer from "./Cheer";

class CheerButton extends Component {
  state = { toggling: false, touched: false };

  handleClick = () => {
    this.setState({ toggling: true, touched: true });

    const { cheered, onCheerToggle } = this.props;

    onCheerToggle(!cheered).then(() => {
      this.setState({ toggling: false });
    });
  };

  render() {
    const { cheered, className, name, small } = this.props;
    const { toggling, touched } = this.state;

    return (
      <>
        <button
          type="button"
          className={
            classnames("chq-cbn", className, {
              "chq-cbn-ch": cheered,
              "chq-cbn-sm": small
            })
          }
          disabled={toggling}
          onClick={this.handleClick}
        >
          <Cheer />
          {!small && <>{" "}Cheer!</>}
        </button>
        {cheered && <Cheer name={name} small={small} pop={touched} />}
      </>
    );
  }
}

export default CheerButton;
