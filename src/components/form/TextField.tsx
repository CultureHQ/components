import * as React from "react";

import classnames from "../../classnames";
import FormError from "./FormError";
import { FormState, withForm } from "./Form";
import { FormFieldError } from "./typings";

type TextFieldValue = string | null;

type HijackedProps = "className" | "name" | "onChange" | "required" | "value";
type TextFieldProps = Omit<React.HTMLAttributes<HTMLTextAreaElement>, HijackedProps> & {
  autoFocus?: boolean;
  children: React.ReactNode;
  className?: string;
  name: string;
  onChange?: (value: TextFieldValue) => void;
  required?: boolean;
  validator?: (value: TextFieldValue) => FormFieldError;
  value?: TextFieldValue;
};

type TextFieldState = {
  touched: boolean;
};

class TextField extends React.Component<TextFieldProps & FormState, TextFieldState> {
  private textAreaRef = React.createRef<HTMLTextAreaElement>();

  state = { touched: false };

  componentDidMount() {
    const { autoFocus } = this.props;
    const textArea = this.textAreaRef.current;

    if (autoFocus && textArea) {
      textArea.focus();
    }
  }

  handleBlur = () => {
    this.setState({ touched: true });
  };

  handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, onChange, onFormChange } = this.props;
    const { value } = event.target;

    if (onChange) {
      onChange(value);
    }

    onFormChange(name, value);
  };

  render() {
    const {
      autoFocus, children, className, errors, name, onError, onFormChange,
      required, submitted, submitting, validator, value, values, ...props
    } = this.props;

    const { touched } = this.state;

    const normal = value || (values[name] as TextFieldValue | undefined);

    return (
      <label className={classnames("chq-ffd", className)} htmlFor={name}>
        <span className="chq-ffd--lb">{children}</span>
        <textarea
          className="chq-ffd--ctrl chq-ffd--ctrl-text"
          ref={this.textAreaRef}
          {...props}
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

export default withForm(TextField);
