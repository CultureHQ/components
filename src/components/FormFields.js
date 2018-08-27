import React, { Component } from "react";

import FormFieldInput from "./FormFieldInput";

class FormField extends Component {
  state = { error: null };

  handleBlur = ({ target: { value } }) => {
    const { required, validator, value } = this.props;

    if (required && !value) {
      this.setState({ error: "Required" });
    }

    if (validator) {
      this.setState({ error: validator(value) });
    }
  };

  handleChange = ({ target: { value } }) => {
    const { onChange } = this.props;

    onChange(value);
  };

  handleFocus = () => {
    this.setState({ error: null });
  };

  render() {
    const { onChange, value, ...props } = this.props;
    const { error } = this.state;

    return (
      <FormFieldInput
        {...props}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        onFocus={this.handleFocus}
        value={value || ""}
        error={error}
      />
    );
  }
}

const buildFormField = type => props => <FormField {...props} type={type} />;

export const EmailField = buildFormField("email");
export const NumberField = buildFormField("number");
export const PasswordField = buildFormField("password");
export const StringField = buildFormField("text");
