import React, { Component } from "react";

import classnames from "../../classnames";
import FormError from "./FormError";

const buildFormField = type => {
  class FormField extends Component {
    static defaultProps = {
      autoFocus: false,
      onChange: () => {},
      onFormChange: () => {}
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
      const { name, value } = this.props;
      const {
        addon, autoFocus, children, className, onError, onFormChange, required,
        submitted, validator, ...props
      } = this.props;

      const { touched } = this.state;

      return (
        <label className={classnames("chq-ffd", className)} htmlFor={name}>
          <span className="chq-ffd--lb">{children}</span>
          <>
            {addon && <span className="chq-ffd--ad">{addon}</span>}
            <input
              className="chq-ffd--ctrl"
              ref={this.inputRef}
              {...props}
              type={type}
              id={name}
              value={value || ""}
              onBlur={this.handleBlur}
              onChange={this.handleChange}
            />
          </>
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
