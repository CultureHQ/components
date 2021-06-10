import React, { useRef, useState } from "react";

import classnames from "../../classnames";
import useAutoFocus from "../../utils/useAutoFocus";

import FormError from "./FormError";
import { useForm } from "./Form";
import { FormFieldError } from "./typings";
import useDisabled from "./useDisabled";

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

const makeFormField = (type: string) => {
  const FormField: React.FC<FormFieldProps> = ({
    addon, autoFocus, children, className, disabled, name, onChange, required,
    validator, value, max, ...props
  }) => {
    const { submitted, values, onError, onFormChange } = useForm();

    const inputRef = useRef<HTMLInputElement | null>(null);
    const [touched, setTouched] = useState<boolean>(false);

    useAutoFocus(autoFocus, inputRef);
    useDisabled(name, disabled);

    const onBlur = () => setTouched(true);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value: nextValue } = event.target;
      if (max && nextValue?.length > max) {
        return;
      }

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
          className={`chq-ffd--ctrl ${max && "chq-ffd--ctrl--with-validation"}`}
          ref={inputRef}
          {...props}
          disabled={disabled}
          type={type}
          id={name}
          name={name}
          value={normal || ""}
          onBlur={onBlur}
          onChange={handleChange}
        />
        {max && (<span className="chq-ffd--ctrl--validation">{normal?.length || 0}/{max}</span>)}
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
