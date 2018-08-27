import React, { Component } from "react";

import { NumberField } from "./FormFields";

class CentsField extends Component {
  handleChange = value => {
    const { name, onChange, onFormChange } = this.props;
    const amount = value ? Math.round(value * 100) : null;

    onChange && onChange(amount);
    onFormChange && onFormChange(name, amount);
  };

  render() {
    const { onChange, onFormChange, value, ...props } = this.props;

    return (
      <NumberField
        {...props}
        value={Number.isFinite(value) ? value / 100 : ""}
        onChange={this.handleChange}
      />
    );
  }
}

export default CentsField;
