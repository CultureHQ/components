import React, { Component } from "react";

import classnames from "../../classnames";
import FormError from "./FormError";
import { withForm } from "./Form";

const buildFormField = type => {
  class FormField extends Component {
    static defaultProps = {
      autoFocus: false,
      onChange: () => {},
      onFormChange: () => {},
      values: {}
    };

    inputRef = React.createRef();

    state = { touched: false };

    componentDidMount() {
      const { autoFocus } = this.props;

      if (autoFocus) {
        this.inputRef.current.focus();
      }
    }

    handleBlur = () => {
      this.setState({ touched: true });
    };

    handleChange = ({ target: { value } }) => {
      const { name, onChange, onFormChange } = this.props;

      onChange(value);
      onFormChange(name, value);
    };

    render() {
      const {
        addon, autoFocus, children, className, errors, name, onError,
        onFormChange, required, submitted, submitting, validator, value, values,
        ...props
      } = this.props;

      const { touched } = this.state;

      const normal = values[name] || value;

      return (
        <label className={classnames("chq-ffd", className)} htmlFor={name}>
          <span className="chq-ffd--lb">{children}</span>
          {addon && <span className="chq-ffd--ad">{addon}</span>}
          <input
            className="chq-ffd--ctrl"
            ref={this.inputRef}
            {...props}
            type={type}
            id={name}
            name={name}
            value={normal || ""}
            onBlur={this.handleBlur}
            onChange={this.handleChange}
          />
          <FormError
            name={name}
            onError={onError}
            required={required}
            submitted={submitted}
            touched={touched}
            validator={validator}
            value={normal}
          />
        </label>
      );
    }
  }

  return withForm(FormField);
};

export const EmailField = buildFormField("email");
export const NumberField = buildFormField("number");
export const PasswordField = buildFormField("password");
export const StringField = buildFormField("text");
