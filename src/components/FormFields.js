import React, { Component } from "react";
import classnames from "classnames";

import FormFieldInput from "./FormFieldInput";

class FormField extends Component {
  state = { touched: false, value: null };

  componentDidUpdate(prevProps) { /* eslint react/no-did-update-set-state: "off" */
    const { touched } = this.props;

    if (touched !== prevProps.touched) {
      this.setState({ touched: true });
    }
  }

  handleChange = ({ target: { value } }) => {
    const { name, onValueChange } = this.props;

    if (onValueChange) {
      onValueChange({ [name]: value });
    }

    this.setState({ touched: true, value });
  };

  render() {
    const { required } = this.props;
    const { touched, value } = this.state;

    return (
      <FormFieldInput
        {...this.props}
        onChange={this.handleChange}
        value={value || ""}
        displayRequired={required && touched && !value}
      />
    );
  }
}

const buildFormField = type => props => <FormField {...props} type={type} />;

export const EmailField = buildFormField("email");
export const NumberField = buildFormField("number");
export const StringField = buildFormField("text");
export const PasswordField = buildFormField("password");
