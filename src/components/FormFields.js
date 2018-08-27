import React, { Component } from "react";
import classnames from "classnames";

const FormFieldInput = ({
  className, name, label, type, value, required, addon, focused, error,
  onBlur, onChange, onFocus
}) => (
  <label className={classnames("chq-ffd", className)} htmlFor={name}>
    <span className="chq-ffd--lb">{label}</span>
    {addon && <span className="chq-ffd--ad">{addon}</span>}
    <input
      type={type}
      id={name}
      name={name}
      value={value || ""}
      required={required}
      onBlur={onBlur}
      onChange={onChange}
      onFocus={onFocus}
    />
    {!focused && error && <p className="chq-ffd--rq">{error}</p>}
  </label>
);

class FormField extends Component {
  state = { error: null, focused: false };

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
    this.setState({ focused: false });
  };

  handleChange = ({ target: { value } }) => {
    const { name, onChange, onFormChange } = this.props;

    onChange && onChange(value);
    onFormChange && onFormChange(name, value);
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

    if (error) {
      this.setState({ error });

      if (onError) {
        onError(name, error);
      }
    }
  };

  render() {
    const { onChange, value, ...props } = this.props;
    const { error, focused } = this.state;

    return (
      <FormFieldInput
        {...props}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        onFocus={this.handleFocus}
        value={value || ""}
        error={error}
        focused={focused}
      />
    );
  }
}

const buildFormField = type => props => <FormField {...props} type={type} />;

export const EmailField = buildFormField("email");
export const NumberField = buildFormField("number");
export const PasswordField = buildFormField("password");
export const StringField = buildFormField("text");
