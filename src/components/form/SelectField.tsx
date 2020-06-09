import React from "react";

import classnames from "../../classnames";
import useAutoFocus from "../../utils/useAutoFocus";

import SelectFieldSingle from "./select/SelectFieldSingle";
import SelectFieldMulti from "./select/SelectFieldMulti";
import { useForm } from "./Form";
import { FormFieldError, SelectOption, SelectValue } from "./typings";
import useDisabled from "./useDisabled";

type SelectFieldCommonProps = {
  autoFocus?: boolean;
  children: React.ReactNode;
  className?: string;
  creatable?: boolean;
  disabled?: boolean;
  multiple?: boolean;
  name: string;
  onSelected?: () => void;
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

const SelectField: React.FC<SelectFieldProps> = ({
  autoFocus = false,
  children,
  className,
  creatable = false,
  disabled,
  multiple = false,
  name,
  onChange,
  onSelected,
  options,
  placeholder = "",
  required = false,
  validator,
  value
}) => {
  const inputRef = React.createRef<HTMLInputElement>();
  const onFocus = useAutoFocus(autoFocus, inputRef);

  useDisabled(name, disabled);

  const context = useForm();
  const passed = {
    ...context,
    autoFocus,
    creatable,
    disabled,
    inputRef,
    name,
    onFocus,
    options,
    onSelected,
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
