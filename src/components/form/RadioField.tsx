import React, { useRef, useState } from "react";

import classnames from "../../classnames";
import useAutoFocus from "../../utils/useAutoFocus";

import FormError from "./FormError";
import { useForm } from "./Form";
import { FormFieldError } from "./typings";

export type RadioFieldValue = string | number;
type RadioFieldOption = {
  label: string;
  value: RadioFieldValue;
};

type RadioFieldProps = Omit<React.HTMLAttributes<HTMLFieldSetElement>, "className"> & {
  autoFocus?: boolean;
  children: React.ReactNode;
  className?: string;
  name: string;
  onChange?: (value: RadioFieldValue) => void;
  options: RadioFieldOption[];
  required?: boolean;
  validator?: (value: RadioFieldValue) => FormFieldError;
  value?: RadioFieldValue | null;
};

const RadioField: React.FC<RadioFieldProps> = ({
  autoFocus, children, className, name, onChange, options, required, validator,
  value, ...props
}) => {
  const { onError, onFormChange, submitted, values } = useForm();

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [touched, setTouched] = useState<boolean>(false);

  useAutoFocus(autoFocus, inputRef);

  const onBlur = () => setTouched(true);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value: nextValue } = event.target;

    if (onChange) {
      onChange(nextValue);
    }

    onFormChange(name, nextValue);
  };

  const normal = value || (values[name] as undefined | RadioFieldValue);

  return (
    <fieldset className={classnames("chq-ffd", className)} {...props}>
      <legend className="chq-ffd--lb">{children}</legend>
      {options.map((option, index) => (
        <label key={option.value} className="chq-ffd--radio" htmlFor={`${name}${index + 1}`}>
          <input
            ref={inputRef}
            aria-label={name}
            type="radio"
            id={`${name}${index + 1}`}
            name={name}
            value={option.value}
            checked={option.value.toString() === normal}
            onBlur={onBlur}
            onChange={handleChange}
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
};

export default RadioField;
