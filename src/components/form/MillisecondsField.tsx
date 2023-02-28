import React, { useRef, useState } from "react";

import classnames from "../../classnames";
import useAutoFocus from "../../utils/useAutoFocus";

import FormError from "./FormError";
import { useForm } from "./Form";
import useDisabled from "./useDisabled";
import Icon, { IconName } from "../Icon";

const millisecondsValidator = (value: string) => {
  if (value && parseFloat(value) < 0) {
    return "Value must be greater than 0.000";
  }
  return null;
};

type MillisecondsFieldValue = number | null;

type HijackedProps = "className" | "name" | "onChange" | "required" | "value";
type MillisecondsFieldProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, HijackedProps> & {
  autoFocus?: boolean;
  children: React.ReactNode;
  className?: string;
  name: string;
  onChange?: (value: MillisecondsFieldValue) => void;
  required?: boolean;
  value?: MillisecondsFieldValue;
  icon?: IconName;
};

const MillisecondsField: React.FC<MillisecondsFieldProps> = ({
  autoFocus, children, className, disabled, name, onChange, required, value, icon,
  ...props
}) => {
  const { onError, onFormChange, submitted, values } = useForm();

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [touched, setTouched] = useState<boolean>(false);

  useAutoFocus(autoFocus, inputRef);
  useDisabled(name, disabled);

  const onBlur = () => setTouched(true);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value: nextValue } = event.target;
    const amount = nextValue ? Math.round(parseFloat(nextValue) * 100) : null;

    if (onChange) {
      onChange(amount);
    }

    onFormChange(name, amount);
  };

  const normal = typeof value === "number" ? value : values[name];

  return (
    <label className={classnames("chq-ffd", className)} htmlFor={name}>
      <span className="chq-ffd--lb">{children}</span>
      <span className="chq-ffd--ad">
        <Icon icon={icon || "clock"} />
      </span>
      <input
        className="chq-ffd--ctrl chq-ffd--ctrl-seconds"
        ref={inputRef}
        {...props}
        disabled={disabled}
        type="number"
        id={name}
        name={name}
        min="0"
        step=".01"
        value={typeof normal === "number" ? normal / 100 : ""}
        onBlur={onBlur}
        onChange={handleChange}
      />
      <FormError
        name={name}
        onError={onError}
        required={required}
        submitted={submitted}
        touched={touched}
        validator={millisecondsValidator}
        value={normal}
      />
    </label>
  );
};

export default MillisecondsField;
