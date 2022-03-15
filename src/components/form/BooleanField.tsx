import React, { useEffect } from "react";

import Checkmark from "../Checkmark";
import classnames from "../../classnames";
import { useForm } from "./Form";
import useDisabled from "./useDisabled";

type BooleanFieldProps = {
  autoFocus?: boolean;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  name: string;
  onChange?: (value: boolean) => void;
  value?: boolean | null;
};

const BooleanField: React.FC<BooleanFieldProps> = ({
  autoFocus, children, className, disabled, name, onChange, value
}) => {
  const { onFormChange, values } = useForm();

  useDisabled(name, disabled);

  const onClick = (checked: boolean) => {
    if (disabled) {
      return;
    }

    if (onChange) {
      onChange(checked);
    }

    onFormChange(name, checked);
  };

  useEffect(
    () => {
      const normal = value || (values[name] as boolean);

      if (normal === undefined || normal === null) {
        onClick(false);
      }
    },
    // Here we're going to explicitly ignore the rules of hooks because we only
    // want this to fire when the component mounts and not in relation to its
    // component props.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const normal = value || (values[name] as boolean);

  return (
    <div className={classnames("chq-ffd", className)}>
      <Checkmark autoFocus={autoFocus} checked={normal} disabled={disabled} onClick={onClick}>
        {children}
      </Checkmark>
    </div>
  );
};

BooleanField.defaultProps = {
  autoFocus: undefined,
  className: undefined,
  disabled: undefined,
  onChange: undefined,
  value: undefined
};

export default BooleanField;
