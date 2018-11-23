import React, { Component } from "react";

import { NumberField } from "./FormFields";
import { withForm } from "./Form";

const centsValidator = value => {
  if (value && parseFloat(value, 10) <= 0) {
    return "Value must be greater than $0.00";
  }
  return null;
};

class CentsField extends Component {
  static defaultProps = {
    onChange: () => {},
    onFormChange: () => {},
    values: {}
  };

  handleChange = value => {
    const { name, onChange, onFormChange } = this.props;
    const amount = value ? Math.round(value * 100) : null;

    onChange(amount);
    onFormChange(name, amount);
  };

  render() {
    const { children, name, onChange, onFormChange, value, values, ...props } = this.props;
    const normal = values[name] || value;

    return (
      <NumberField
        {...props}
        step=".01"
        min="0"
        addon="$"
        value={Number.isFinite(normal) ? normal / 100 : ""}
        validator={centsValidator}
        onChange={this.handleChange}
      >
        {children}
      </NumberField>
    );
  }
}

export default withForm(CentsField);
