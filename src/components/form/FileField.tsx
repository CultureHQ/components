import React, { useRef, useState } from "react";

import classnames from "../../classnames";
import useAutoFocus from "../../utils/useAutoFocus";

import FormError from "./FormError";
import { useForm } from "./Form";
import { FormFieldError } from "./typings";
import useDisabled from "./useDisabled";

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

const FileField: React.FC<FileFieldProps> = ({
  autoFocus, children, className, disabled, multiple, name, onChange, required,
  validator, value, ...props
}) => {
  const { onError, onFormChange, submitted, values } = useForm();

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [touched, setTouched] = useState<boolean>(false);

  useAutoFocus(autoFocus, inputRef);
  useDisabled(name, disabled);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTouched(true);

    const { files } = event.target;
    let nextValue = null;

    if (files && files.length > 0) {
      nextValue = multiple ? files : files[0];
    }

    if (onChange) {
      onChange(nextValue);
    }

    onFormChange(name, nextValue);
  };

  const normal = value || (values[name] as undefined | FileFieldValue);
  let fileDisplay: string;

  if (!normal) {
    fileDisplay = "";
  } else if (multiple) {
    fileDisplay = Array.from(normal as FileList).map(file => file.name).join(", ");
  } else {
    fileDisplay = (normal as File).name;
  }

  return (
    <label className={classnames("chq-ffd", className)} htmlFor={name}>
      <span className="chq-ffd--lb">{children}</span>
      <div className="chq-ffd--fi">
        <input
          className="chq-ffd--ctrl"
          ref={inputRef}
          {...props}
          disabled={disabled}
          type="file"
          multiple={multiple}
          id={name}
          name={name}
          onChange={handleChange}
        />
        <div className="chq-ffd--di">
          <div className="chq-ffd--ch">Choose file{multiple && "s"}...</div>
          <div className="chq-ffd--fd">{fileDisplay}</div>
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
};

export default FileField;
