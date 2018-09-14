import React, { Component, Fragment } from "react";

import classnames from "../classnames";
import Button from "./Button";
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
    const { cheered, className, name, onCheerToggle } = this.props;
    const { toggling, touched } = this.state;

    return (
      <Fragment>
        <button
          type="button"
          className={classnames("chq-cbn", className, { "chq-cbn-ch": cheered })}
          disabled={toggling}
          onClick={this.handleClick}
        >
          <Cheer /> Cheer!
        </button>
        {cheered && <Cheer name={name} pop={touched} />}
      </Fragment>
    );
  }
}

export default CheerButton;
