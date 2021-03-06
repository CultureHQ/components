import React, { useRef, useState } from "react";

import classnames from "../../classnames";
import useAutoFocus from "../../utils/useAutoFocus";

import FormError from "./FormError";
import { useForm } from "./Form";
import { FormFieldError } from "./typings";
import useDisabled from "./useDisabled";

type TextFieldValue = string | null;

type HijackedProps = "className" | "name" | "onChange" | "required" | "value";
type TextFieldProps = Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HijackedProps> & {
  autoFocus?: boolean;
  children: React.ReactNode;
  className?: string;
  name: string;
  onChange?: (value: TextFieldValue) => void;
  required?: boolean;
  validator?: (value: TextFieldValue) => FormFieldError;
  value?: TextFieldValue;
};

const TextField: React.FC<TextFieldProps> = ({
  autoFocus, children, className, disabled, name, onChange, required, validator, value, ...props
}) => {
  const { onError, onFormChange, submitted, values } = useForm();

  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const [touched, setTouched] = useState<boolean>(false);

  useAutoFocus(autoFocus, textAreaRef);
  useDisabled(name, disabled);

  const onBlur = () => setTouched(true);
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value: nextValue } = event.target;

    if (onChange) {
      onChange(nextValue);
    }

    onFormChange(name, nextValue);
  };

  const normal = value || (values[name] as TextFieldValue | undefined);

  return (
    <label className={classnames("chq-ffd", className)} htmlFor={name}>
      <span className="chq-ffd--lb">{children}</span>
      <textarea
        className="chq-ffd--ctrl chq-ffd--ctrl-text"
        ref={textAreaRef}
        {...props}
        id={name}
        name={name}
        value={normal || ""}
        onBlur={onBlur}
        onChange={handleChange}
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
};

export default TextField;
