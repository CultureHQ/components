import React, { useState } from "react";

import classnames from "../../classnames";
import useAutoFocus from "../../utils/useAutoFocus";

import SelectFieldSingle from "./select/SelectFieldSingle";
import SelectFieldMulti from "./select/SelectFieldMulti";
import { useForm } from "./Form";
import { FormFieldError, SelectOption, SelectValue } from "./typings";
import useDisabled from "./useDisabled";
import DoorEffect from "../DoorEffect";

type SelectFieldCommonProps = {
  autoFocus?: boolean;
  children: React.ReactNode;
  childIsLabel?: boolean;
  className?: string;
  creatable?: boolean;
  disabled?: boolean;
  multiple?: boolean;
  name: string;
  fixedValue?: boolean;
  imageIconPath?: string;
  onCloseAction?: () => void;
  onSelected?: () => void;
  onUnselected?: () => void;
  options: SelectOption[];
  placeholder?: string;
  required?: boolean;
  allowEmpty?: boolean;
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
  allowEmpty,
  autoFocus = false,
  children,
  childIsLabel = true,
  className,
  creatable = false,
  disabled,
  imageIconPath,
  multiple = false,
  name,
  fixedValue = false,
  onChange,
  onUnselected,
  options,
  placeholder = "",
  required = false,
  validator,
  value
}) => {
  const [openShareWith, setOpenShareWith] = useState<boolean>(false);
  const inputRef = React.createRef<HTMLInputElement>();
  const onFocus = useAutoFocus(autoFocus, inputRef);
  const resultWithCategory = Object.prototype.hasOwnProperty.call(options[0], "category");
  console.log(resultWithCategory)

  useDisabled(name, disabled);

  const onSelected = () => {
    setOpenShareWith(true);
  };

  const onCloseAction = () => {
    setOpenShareWith(false);
  };

  const context = useForm();
  const passed = {
    ...context,
    allowEmpty,
    autoFocus,
    creatable,
    disabled,
    imageIconPath,
    inputRef,
    name,
    fixedValue,
    onCloseAction,
    onFocus,
    options,
    onSelected,
    onUnselected,
    placeholder,
    resultWithCategory,
    required,
    selectRef: React.createRef<HTMLDivElement>()
  };

  return (
    <label className={classnames("chq-ffd", className)} htmlFor={name}>
      { childIsLabel && (<span className="chq-ffd--lb">{children}</span>) }
      {
        multiple
          ? (
            <div>
              <SelectFieldMulti
                {...passed}
                onChange={onChange as SelectFieldMultiProps["onChange"]}
                validator={validator as SelectFieldMultiProps["validator"]}
                value={value as SelectFieldMultiProps["value"]}
              >
                { !childIsLabel && (
                  <DoorEffect className="chq-ffd--sl--opts" open={openShareWith}>
                    <div className="chq-ffd--lb">{children}</div>
                  </DoorEffect>
                )}
              </SelectFieldMulti>
            </div>
          )
          : (
            <div>
              <SelectFieldSingle
                {...passed}
                onChange={onChange as SelectFieldSingleProps["onChange"]}
                validator={validator as SelectFieldSingleProps["validator"]}
                value={value as SelectFieldSingleProps["value"]}
              >
                { !childIsLabel && (
                  <DoorEffect className="chq-ffd--sl--opts" open={openShareWith}>
                    <div className="chq-ffd--lb">{children}</div>
                  </DoorEffect>
                )}
              </SelectFieldSingle>
            </div>
          )
      }
    </label>
  );
};

export default SelectField;
