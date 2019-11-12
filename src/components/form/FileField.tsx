import React from "react";

import classnames from "../../classnames";
import FormError from "./FormError";
import { FormState, withForm } from "./Form";
import { FormFieldError } from "./typings";

export type FileFieldValue = File | FileList | string[] | null;

type HijackedProps = "className" | "multiple" | "name" | "onChange" | "required" | "value";
type FileFieldProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, HijackedProps> & {
  autoFocus?: boolean;
  children: React.ReactNode;
  className?: string;
  multiple?: boolean;
  name: string;
  onChange?: (value: FileFieldValue) => void;
  required?: boolean;
  validator?: (value: FileFieldValue) => FormFieldError;
  value?: FileFieldValue;
};

type FileFieldState = {
  touched: boolean;
};

class FileField extends React.Component<FileFieldProps & FormState, FileFieldState> {
  private inputRef = React.createRef<HTMLInputElement>();

  state = { touched: false };

  componentDidMount() {
    const { autoFocus } = this.props;
    const input = this.inputRef.current;

    if (autoFocus && input) {
      input.focus();
    }
  }

  getFileDisplay() {
    const { multiple, name, value, values } = this.props;
    const normal = value || (values[name] as undefined | FileFieldValue);

    if (!normal) {
      return "";
    }

    if (multiple) {
      return Array.from(normal as FileList).map(file => file.name).join(", ");
    }

    return (normal as File).name;
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ touched: true });

    const { multiple, name, onChange, onFormChange } = this.props;

    const { files } = event.target;
    let value = null;

    if (files && files.length > 0) {
      value = multiple ? files : files[0];
    }

    if (onChange) {
      onChange(value);
    }

    onFormChange(name, value);
  };

  render() {
    const {
      autoFocus, children, className, errors, multiple, name, onError,
      onFormChange, required, submitted, submitting, validator, value, values,
      ...props
    } = this.props;

    const { touched } = this.state;

    const normal = value || values[name];

    return (
      <label className={classnames("chq-ffd", className)} htmlFor={name}>
        <span className="chq-ffd--lb">{children}</span>
        <div className="chq-ffd--fi">
          <input
            className="chq-ffd--ctrl"
            ref={this.inputRef}
            {...props}
            type="file"
            multiple={multiple}
            id={name}
            name={name}
            onChange={this.handleChange}
          />
          <div className="chq-ffd--di">
            <div className="chq-ffd--ch">Choose file{multiple && "s"}...</div>
            <div className="chq-ffd--fd">{this.getFileDisplay()}</div>
          </div>
        </div>
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

export default withForm(FileField);
