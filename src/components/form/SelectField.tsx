import * as React from "react";

import classnames from "../../classnames";
import SelectFieldSingle from "./select/SelectFieldSingle";
import SelectFieldMulti from "./select/SelectFieldMulti";
import useAutoFocus from "./select/useAutoFocus";
import { useForm } from "./Form";
import { FormFieldError, SelectOption, SelectValue } from "./typings";

type SelectFieldCommonProps = {
  autoFocus?: boolean;
  children: React.ReactNode;
  className?: string;
  creatable?: boolean;
  multiple?: boolean;
  name: string;
  options: SelectOption[];
  placeholder?: string;
  required?: boolean;
};

type SelectFieldSingleProps = {
  multiple: false;
  onChange?: (value: null | SelectValue) => void;
  validator?: (value: null | SelectValue) => FormFieldError;
  value?: null | SelectValue;
};

type SelectFieldMultiProps = {
  multiple: true;
  onChange?: (value: null | SelectValue[]) => void;
  validator?: (value: null | SelectValue[]) => FormFieldError;
  value?: null | SelectValue[];
};

type SelectFieldProps = SelectFieldCommonProps & (
  SelectFieldSingleProps | Omit<SelectFieldSingleProps, "multiple"> | SelectFieldMultiProps
);

const SelectField = ({
  autoFocus = false,
  children,
  className,
  creatable = false,
  multiple = false,
  name,
  onChange,
  options,
  placeholder = "",
  required = false,
  validator,
  value
}: SelectFieldProps) => {
  const inputRef = React.createRef<HTMLInputElement>();
  const onFocus = useAutoFocus(autoFocus, inputRef);

  const context = useForm();
  const passed = {
    ...context,
    autoFocus,
    creatable,
    inputRef,
    name,
    onFocus,
    options,
    placeholder,
    required,
    selectRef: React.createRef<HTMLDivElement>()
  };

  return (
    <label className={classnames("chq-ffd", className)} htmlFor={name}>
      <span className="chq-ffd--lb">{children}</span>
      {
        multiple
          ? (
            <SelectFieldMulti
              {...passed}
              onChange={onChange as SelectFieldMultiProps["onChange"]}
              validator={validator as SelectFieldMultiProps["validator"]}
              value={value as SelectFieldMultiProps["value"]}
            />
          )
          : (
            <SelectFieldSingle
              {...passed}
              onChange={onChange as SelectFieldSingleProps["onChange"]}
              validator={validator as SelectFieldSingleProps["validator"]}
              value={value as SelectFieldSingleProps["value"]}
            />
          )
      }
    </label>
  );
};

export default SelectField;
