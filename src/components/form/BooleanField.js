import React, { Component } from "react";

import Checkmark from "../Checkmark";
import classnames from "../../classnames";

class BooleanField extends Component {
  static defaultProps = {
    onChange: () => {},
    onFormChange: () => {}
  };

  componentDidMount() {
    const { value } = this.props;

    if (value === undefined || value === null) {
      this.handleClick(false);
    }
  }

  handleClick = checked => {
    const { name, onChange, onFormChange } = this.props;

    onChange(checked);
    onFormChange(name, checked);
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
