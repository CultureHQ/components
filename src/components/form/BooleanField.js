import React, { Component } from "react";

import Checkmark from "../Checkmark";
import classnames from "../../classnames";

class BooleanField extends Component {
  componentDidMount() {
    const { value } = this.props;

    if (value === undefined || value === null) {
      this.handleClick(false);
    }
  }

  handleClick = checked => {
    const { name, onChange, onFormChange } = this.props;

    if (onChange) {
      onChange(checked);
    }

    if (onFormChange) {
      onFormChange(name, checked);
    }
  };

  render() {
    const { children, className, value } = this.props;

    return (
      <div className={classnames("chq-ffd", className)}>
        <Checkmark checked={value} onClick={this.handleClick}>
          {children}
        </Checkmark>
      </div>
    );
  }
}

export default BooleanField;
