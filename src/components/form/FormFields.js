import React, { Component, Fragment } from "react";

import classnames from "../../classnames";
import FormError from "./FormError";

const buildFormField = type => {
  class FormField extends Component {
    state = { touched: false };

    handleBlur = () => {
      this.setState({ touched: true });
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

    render() {
      const { name, value } = this.props;
      const {
        addon, children, className, onError, onFormChange, required, submitted,
        validator, ...props
      } = this.props;

      const { touched } = this.state;

      return (
        <label className={classnames("chq-ffd", className)} htmlFor={name}>
          <span className="chq-ffd--lb">{children}</span>
          <Fragment>
            {addon && <span className="chq-ffd--ad">{addon}</span>}
            <input
              {...props}
              type={type}
              id={name}
              value={value || ""}
              onBlur={this.handleBlur}
              onChange={this.handleChange}
            />
          </Fragment>
          <FormError
            name={name}
            onError={onError}
            required={required}
            submitted={submitted}
            touched={touched}
            validator={validator}
            value={value}
          />
        </label>
      );
    }
  }

  return FormField;
};

export const EmailField = buildFormField("email");
export const NumberField = buildFormField("number");
export const PasswordField = buildFormField("password");
export const StringField = buildFormField("text");
