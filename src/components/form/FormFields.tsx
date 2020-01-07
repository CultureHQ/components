import React, { useRef, useState } from "react";

import classnames from "../../classnames";
import FormError from "./FormError";
import { useForm } from "./Form";
import useAutoFocus from "./select/useAutoFocus";
import { FormFieldError } from "./typings";

type HijackedProps = "className" | "name" | "onChange" | "required" | "value";
type FormFieldProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, HijackedProps> & {
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

const makeFormField = (type: string) => {
  const FormField: React.FC<FormFieldProps> = ({
    addon, autoFocus, children, className, name, onChange, required, validator, value, ...props
  }) => {
    const { submitted, values, onError, onFormChange } = useForm();

    const inputRef = useRef<HTMLInputElement | null>(null);
    const [touched, setTouched] = useState<boolean>(false);

    useAutoFocus(autoFocus || false, inputRef);

    const onBlur = () => setTouched(true);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value: nextValue } = event.target;

      if (onChange) {
        onChange(nextValue);
      }
      onFormChange(name, nextValue);
    };

    const normal = value || (values[name] as undefined | string);

    return (
      <label className={classnames("chq-ffd", className)} htmlFor={name}>
        <span className="chq-ffd--lb">{children}</span>
        {addon && <span className="chq-ffd--ad">{addon}</span>}
        <input
          className="chq-ffd--ctrl"
          ref={inputRef}
          {...props}
          type={type}
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

  return FormField;
};

export const EmailField = makeFormField("email");
export const NumberField = makeFormField("number");
export const PasswordField = makeFormField("password");
export const StringField = makeFormField("text");
