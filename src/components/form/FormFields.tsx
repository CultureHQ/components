import React from "react";

import classnames from "../../classnames";
import FormError from "./FormError";
import { FormState, withForm } from "./Form";
import { FormFieldError } from "./typings";

type HijackedProps = "className" | "name" | "onChange" | "required" | "value";
type FormFieldProps = Omit<React.HTMLAttributes<HTMLInputElement>, HijackedProps> & {
  addon?: string;
  autoFocus?: boolean;
  children: React.ReactNode;
  className?: string;
  name: string;
  onChange?: (value: string) => void;
  required?: boolean;
  validator?: (value: string) => FormFieldError;
  value?: string;
};

type FormFieldState = {
  touched: boolean;
};

const buildFormField = (type: string, displayName: string) => withForm(
  class extends React.Component<FormFieldProps & FormState, FormFieldState> {
    private inputRef = React.createRef<HTMLInputElement>();

    static displayName = displayName;

    state = { touched: false };

    componentDidMount() {
      const { autoFocus } = this.props;
      const input = this.inputRef.current;

      if (autoFocus && input) {
        input.focus();
      }
    }

    handleBlur = () => {
      this.setState({ touched: true });
    };

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, onChange, onFormChange } = this.props;
      const { value } = event.target;

      if (onChange) {
        onChange(value);
      }
      onFormChange(name, value);
    };

    render() {
      const {
        addon, autoFocus, children, className, errors, name, onError,
        onFormChange, required, submitted, submitting, validator, value, values,
        ...props
      } = this.props;

      const { touched } = this.state;

      const normal = value || (values[name] as undefined | string);

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
);

export const EmailField = buildFormField("email", "EmailField");
export const NumberField = buildFormField("number", "NumberField");
export const PasswordField = buildFormField("password", "PasswordField");
export const StringField = buildFormField("text", "StringField");
