import React from "react";

import classnames from "../../classnames";
import FormError from "./FormError";
import { FormState, withForm } from "./Form";

const centsValidator = (value: string) => {
  if (value && parseFloat(value) <= 0) {
    return "Value must be greater than $0.00";
  }
  return null;
};

type CentsFieldValue = number | null;

type HijackedProps = "className" | "name" | "onChange" | "required" | "value";
type CentsFieldProps = Omit<React.HTMLAttributes<HTMLInputElement>, HijackedProps> & {
  autoFocus?: boolean;
  children: React.ReactNode;
  className?: string;
  name: string;
  onChange?: (value: CentsFieldValue) => void;
  required?: boolean;
  value?: CentsFieldValue;
};

type CentsFieldState = {
  touched: boolean;
};

class CentsField extends React.Component<CentsFieldProps & FormState, CentsFieldState> {
  private inputRef = React.createRef<HTMLInputElement>();

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
    const amount = value ? Math.round(parseFloat(value) * 100) : null;

    if (onChange) {
      onChange(amount);
    }

    onFormChange(name, amount);
  };

  render() {
    const {
      autoFocus, children, className, errors, name, onError, onFormChange,
      required, submitted, submitting, value, values, ...props
    } = this.props;

    const { touched } = this.state;

    const normal = value || values[name];

    return (
      <label className={classnames("chq-ffd", className)} htmlFor={name}>
        <span className="chq-ffd--lb">{children}</span>
        <span className="chq-ffd--ad">$</span>
        <input
          className="chq-ffd--ctrl"
          ref={this.inputRef}
          {...props}
          type="number"
          id={name}
          name={name}
          min="0"
          step=".01"
          value={typeof normal === "number" ? normal / 100 : ""}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
        />
        <FormError
          name={name}
          onError={onError}
          required={required}
          submitted={submitted}
          touched={touched}
          validator={centsValidator}
          value={normal}
        />
      </label>
    );
  }
}

export default withForm(CentsField);
