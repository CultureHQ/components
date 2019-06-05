import React, { Component } from "react";

import classnames from "../../classnames";
import PlainButton from "../buttons/PlainButton";

class TimeSelectOption extends Component {
  handleClick = () => {
    const { onClick, option } = this.props;
    const parts = option.value.split(":");

    onClick(parts[0], parts[1]);
  };

  render() {
    const { option, value, activeOptionRef } = this.props;

    const isActive = option.value === value;
    const classList = classnames("chq-tsl--op", {
      "chq-tsl--op-act": isActive
    });

    return (
      <PlainButton
        ref={isActive ? activeOptionRef : null}
        className={classList}
        value={option.value}
        onClick={this.handleClick}
      >
        {option.label}
      </PlainButton>
    );
  }
}

export default TimeSelectOption;
