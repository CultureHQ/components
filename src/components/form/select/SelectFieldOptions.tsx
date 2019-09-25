import React from "react";

import classnames from "../../../classnames";
import PlainButton from "../../buttons/PlainButton";
import DoorEffect from "../../DoorEffect";
import { SelectFieldPassedProps, SelectOption, SelectValue } from "../typings";

type IsCreatingOptionOpts = Pick<SelectFieldPassedProps, "display" | "multiple" | "options" | "value">;

const isCreatingOption = ({ display, multiple, options, value }: IsCreatingOptionOpts) => {
  const matchedLabel = options.some(option => option.label === display);

  if (!multiple) {
    return !matchedLabel && display !== value;
  }

  const multiValue = value as null | SelectValue[];
  return !matchedLabel && (!multiValue || !multiValue.some(item => item === display));
};

type SelectFieldOptionProps = Pick<SelectFieldPassedProps, "onDeselect" | "onSelect"> & {
  active: boolean;
  option: SelectOption;
  tabIndex: number;
};

const SelectFieldOption: React.FC<SelectFieldOptionProps> = ({
  active,
  option,
  onDeselect,
  onSelect,
  tabIndex
}) => {
  const { label, value } = option;

  const className = classnames({ "chq-ffd--sl--opt-act": active });
  const onClick = () => (active ? onDeselect : onSelect)(value);

  return (
    <PlainButton className={className} onClick={onClick} tabIndex={tabIndex}>
      {label}
    </PlainButton>
  );
};

type SelectFieldOptionsProps = Pick<SelectFieldPassedProps, "creatable" | "display" | "filteredOptions" | "multiple" | "onDeselect" | "onSelect" | "open" | "options" | "value">;

const SelectFieldOptions: React.FC<SelectFieldOptionsProps> = ({
  creatable,
  display,
  filteredOptions,
  multiple,
  onDeselect,
  onSelect,
  open,
  options,
  value
}) => {
  const createOption = creatable && isCreatingOption({ display, multiple, options, value });

  return (
    <DoorEffect className="chq-ffd--sl--opts" open={open}>
      {createOption && (display.length > 0) && (
        <SelectFieldOption
          key={display}
          active={false}
          onDeselect={onDeselect}
          onSelect={onSelect}
          option={{ label: `Create option: ${display}`, value: display }}
          tabIndex={open ? 0 : -1}
        />
      )}
      {filteredOptions.map(option => (
        <SelectFieldOption
          key={option.value}
          active={!!value && (multiple ? value.includes(option.value) : option.value === value)}
          onDeselect={onDeselect}
          onSelect={onSelect}
          option={option}
          tabIndex={open ? 0 : -1}
        />
      ))}
      {!createOption && (filteredOptions.length === 0) && (
        <p>No results found.</p>
      )}
    </DoorEffect>
  );
};

export default SelectFieldOptions;
