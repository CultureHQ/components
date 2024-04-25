import React, { useRef, useState } from "react";

import classnames from "../../classnames";
import useAutoFocus from "../../utils/useAutoFocus";

import FormError from "./FormError";
import { useForm } from "./Form";
import { FormFieldError } from "./typings";
import useDisabled from "./useDisabled";
import Icon, { IconName } from "../Icon";

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
  suffixIcon?: IconName;
  suffixText?: string;
  validEmailAnimation?: boolean;
  validEmail?: boolean;
};

const makeFormField = (type: string) => {
  const FormField: React.FC<FormFieldProps> = ({
    addon, autoFocus, children, className, disabled, name, onChange, required,
    validator, value, max, min, validEmailAnimation, validEmail, suffixIcon, suffixText, ...props
  }) => {
    const { submitted, values, onError, onFormChange } = useForm();

    const inputRef = useRef<HTMLInputElement | null>(null);
    const [touched, setTouched] = useState<boolean>(false);

    useAutoFocus(autoFocus, inputRef);
    useDisabled(name, disabled);

    const onBlur = () => setTouched(true);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value: nextValue } = event.target;
      if (max && nextValue?.length > +max) {
        return;
      }

      if (onChange) {
        onChange(nextValue);
      }
      onFormChange(name, nextValue);
    };

    const normal = value !== undefined ? value : (values[name] as undefined | string);

    return (
      <label className={classnames("chq-ffd", className)} htmlFor={name}>
        <span className="chq-ffd--lb">{children}</span>
        {addon && <span className="chq-ffd--ad">{addon}</span>}
        <>
          <div className="chq-sfx">
            {suffixText && (<span className="chq-sfx-text">{suffixText}</span>)}
            {suffixIcon && !validEmailAnimation && (
              <Icon className="chq-sfx--suffix-icon" icon={suffixIcon} />
            )}
            {validEmailAnimation && (
              <>
                {validEmail ? (
                  <div className="chq-sfx--suffix-icon chq-cmk chq-cmk-ck">
                    <svg viewBox="0 0 52 52">
                      <circle cx="26" cy="26" r="25" fill="none" />
                      <path fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                    </svg>
                  </div>
                ) : (
                  <div className="chq-sfx--suffix-icon">
                    <Icon icon={suffixIcon || "arrow-left-c"} />
                  </div>
                )}
              </>
            )}
          </div>
          <input
            className={`chq-ffd--ctrl ${max && "chq-ffd--ctrl--with-validation"}`}
            style={suffixIcon || validEmailAnimation ? { paddingRight: "40px" } : {}}
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
        </>
        {max && (<span className="chq-ffd--ctrl--validation">{min !== undefined ? min : normal?.length || 0}/{max}</span>)}
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
