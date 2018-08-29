import React, { Component } from "react";

import classnames from "../classnames";

class FormField extends Component {
  state = {
    error: null,
    focused: false,
    touched: false
  };

  componentDidMount() {
    this.deriveError();
  }

  componentDidUpdate(prevProps) {
    const { value } = this.props;

    if (value !== prevProps.value) {
      this.deriveError();
    }
  }

  handleBlur = () => {
    this.setState({ focused: false, touched: true });
  };

  handleChange = ({ target: { value } }) => {
    const { name, onChange, onFormChange } = this.props;

    if (onChange) {
      onChange(value);
    }

    if (onFormChange) {
      onFormChange(name, value);
    }
  };

  handleFocus = () => {
    this.setState({ focused: true });
  };

  deriveError = () => {
    const { name, onError, required, validator, value } = this.props;

    let error = null;

    if (required && !value) {
      error = "Required";
    } else if (validator) {
      error = validator(value);
    }

    this.setState({ error });

    if (onError) {
      onError(name, error);
    }
  };

  render() {
    const {
      addon, children, className, onError, onChange, onFormChange, name,
      required, submitted, validator, value, ...props
    } = this.props;

    const { error, focused, touched } = this.state;

    const displayError = submitted || (touched && !focused);

    return (
      <label className={classnames("chq-ffd", className)} htmlFor={name}>
        <span className="chq-ffd--lb">{children}</span>
        {addon && <span className="chq-ffd--ad">{addon}</span>}
        <input
          {...props}
          id={name}
          name={name}
          value={value || ""}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
        />
        {error && displayError && <p className="chq-ffd--rq">{error}</p>}
      </label>
    );
  }
}

const buildFormField = type => props => <FormField {...props} type={type} />;

export const EmailField = buildFormField("email");
export const NumberField = buildFormField("number");
export const PasswordField = buildFormField("password");
export const StringField = buildFormField("text");
