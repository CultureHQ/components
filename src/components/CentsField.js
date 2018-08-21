import React, { Component } from "react";

import FormFieldInput from "./FormFieldInput";

class CentsField extends Component {
  state = { touched: false, value: null };

  componentDidUpdate(prevProps) {
    const { touched } = this.props;

    if (touched !== prevProps.touched) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ touched: true });
    }
  }

  handleChange = ({ target: { value } }) => {
    const { name, onValueChange } = this.props;
    const amount = value ? Math.round(value * 100) : null;

    if (onValueChange) {
      onValueChange({ [name]: amount });
    }

    this.setState({ touched: true, value: amount });
  };

  render() {
    const { required } = this.props;
    const { touched, value } = this.state;

    return (
      <FormFieldInput
        {...this.props}
        type="number"
        step="0.01"
        min="0"
        addon="$"
        onChange={this.handleChange}
        value={Number.isFinite(value) ? value / 100 : ""}
        displayRequired={required && touched && !value}
      />
    );
  }
}

export default CentsField;
