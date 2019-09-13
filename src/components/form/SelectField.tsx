import * as React from "react";

import classnames from "../../classnames";
import SelectFieldSingle from "./select/SelectFieldSingle";
import SelectFieldMulti from "./select/SelectFieldMulti";
import { withForm } from "./Form";

type SelectFieldCommonProps = {
  children: React.ReactNode;
  className?: string;
};

type SelectFieldProps = SelectFieldCommonProps & (
  ({ multiple?: false } & React.ComponentProps<typeof SelectFieldSingle>)
  | ({ multiple: true } & React.ComponentProps<typeof SelectFieldMulti>)
);

const SelectField = ({
  autoFocus = false,
  children,
  className,
  creatable = false,
  multiple = false,
  name,
  placeholder = "",
  required = false,
  ...props
}: SelectFieldProps) => {
  const passed = { ...props, autoFocus, creatable, name, placeholder, required };

  return (
    <label className={classnames("chq-ffd", className)} htmlFor={name}>
      <span className="chq-ffd--lb">{children}</span>
      {multiple ? <SelectFieldMulti {...passed} /> : <SelectFieldSingle {...passed} />}
    </label>
  );
};

export default withForm(SelectField);
