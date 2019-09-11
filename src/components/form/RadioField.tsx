import * as React from "react";

import classnames from "../../classnames";
import FormError from "./FormError";
import { FormState, withForm } from "./Form";

type RadioFieldValue = string | number;
type RadioFieldOption = {
  label: string;
  value: RadioFieldValue;
};

type RadioFieldProps = Omit<React.HTMLAttributes<HTMLFieldSetElement>, "className"> & {
  children: React.ReactNode;
  className?: string;
  name: string;
  onChange?: (value: RadioFieldValue) => void;
  options: RadioFieldOption[];
  required?: boolean;
  validator: (value: RadioFieldValue) => string | null;
  value?: RadioFieldValue;
};

type RadioFieldState = {
  touched: boolean;
};

class RadioField extends React.Component<RadioFieldProps & FormState, RadioFieldState> {
  state = { touched: false };

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
      children, className, errors, name, onChange, onError, onFormChange,
      options = [], required, submitted, submitting, validator, value, values,
      ...props
    } = this.props;

    const { touched } = this.state;

    const normal = value || (values[name] as undefined | RadioFieldValue);

    return (
      <fieldset className={classnames("chq-ffd", className)} {...props}>
        <legend className="chq-ffd--lb">{children}</legend>
        {options.map((option, index) => (
          <label key={option.value} className="chq-ffd--radio" htmlFor={`${name}${index + 1}`}>
            <input
              aria-label={name}
              type="radio"
              id={`${name}${index + 1}`}
              name={name}
              value={option.value}
              checked={option.value.toString() === normal}
              onBlur={this.handleBlur}
              onChange={this.handleChange}
            />
            <em className="chq-ffd--radio-check" />
            {" "}
            {option.label}
          </label>
        ))}
        <FormError
          name={name}
          onError={onError}
          required={required}
          submitted={submitted}
          touched={touched}
          validator={validator}
          value={normal}
        />
      </fieldset>
    );
  }
}

export default withForm(RadioField);
