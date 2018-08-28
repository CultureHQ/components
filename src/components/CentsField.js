import React, { Component } from "react";

import { NumberField } from "./FormFields";

class CentsField extends Component {
  handleChange = value => {
    const { name, onChange, onFormChange } = this.props;
    const amount = value ? Math.round(value * 100) : null;

    if (onChange) {
      onChange(amount);
    }

    if (onFormChange) {
      onFormChange(name, amount);
    }
  };

  handleValidate = value => {
    if (value && parseFloat(value, 10) <= 0) {
      return "Value must be greater than $0.00";
    }
    return null;
  };

  render() {
    const { children, onChange, onFormChange, value, ...props } = this.props;

    return (
      <NumberField
        {...props}
        step=".01"
        min="0"
        addon="$"
        value={Number.isFinite(value) ? value / 100 : ""}
        validator={this.handleValidate}
        onChange={this.handleChange}
      >
        {children}
      </NumberField>
    );
  }
}

export default CentsField;
