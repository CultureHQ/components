import React, { useEffect } from "react";

import Checkmark from "../Checkmark";
import classnames from "../../classnames";
import { useForm } from "./Form";

type BooleanFieldProps = {
  children: React.ReactNode;
  className?: string;
  name: string;
  onChange?: (value: boolean) => void;
  value?: boolean | null;
};

const BooleanField: React.FC<BooleanFieldProps> = ({
  children, className, name, onChange, value
}) => {
  const { onFormChange, values } = useForm();

  const handleClick = (checked: boolean) => {
    if (onChange) {
      onChange(checked);
    }

    onFormChange(name, checked);
  };

  useEffect(
    () => {
      const normal = value || (values[name] as boolean);

      if (normal === undefined || normal === null) {
        handleClick(false);
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
      <Checkmark checked={normal} onClick={handleClick}>
        {children}
      </Checkmark>
    </div>
  );
};

export default BooleanField;
