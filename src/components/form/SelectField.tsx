import * as React from "react";

import classnames from "../../classnames";
import SelectFieldSingle from "./select/SelectFieldSingle";
import SelectFieldMulti from "./select/SelectFieldMulti";
import useAutoFocus from "./select/useAutoFocus";
import { useForm } from "./Form";
import { SelectValue } from "./typings";

type SelectFieldCommonProps = {
  autoFocus?: boolean;
  children: React.ReactNode;
  className?: string;
  creatable?: boolean;
  multiple?: boolean;
  name: string;
  placeholder?: string;
  required?: boolean;
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
  const inputRef = React.createRef<HTMLInputElement>();
  const onFocus = useAutoFocus(autoFocus, inputRef);

  const context = useForm();
  const passed = {
    ...props,
    ...context,
    autoFocus,
    creatable,
    inputRef,
    name,
    onFocus,
    placeholder,
    required,
    selectRef: React.createRef<HTMLDivElement>()
  };

  return (
    <label className={classnames("chq-ffd", className)} htmlFor={name}>
      <span className="chq-ffd--lb">{children}</span>
      {multiple ? <SelectFieldMulti {...passed} /> : <SelectFieldSingle {...passed} />}
    </label>
  );
};

export default SelectField;
