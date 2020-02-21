import React from "react";

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
  current: boolean;
  option: SelectOption;
  tabIndex: number;
};

const SelectFieldOption: React.FC<SelectFieldOptionProps> = React.memo(({
  current,
  option,
  onDeselect,
  onSelect,
  tabIndex
}) => {
  const { label, value } = option;
  const onClick = () => (current ? onDeselect : onSelect)(value);

  return (
    <PlainButton aria-current={current} onClick={onClick} tabIndex={tabIndex}>
      {label}
    </PlainButton>
  );
});

type MakeCurrentMatcherOpts = Pick<SelectFieldPassedProps, "multiple" | "value">;
type CurrentMatcher = (option: SelectOption) => boolean;

const makeCurrentMatcher = ({ multiple, value }: MakeCurrentMatcherOpts): CurrentMatcher => {
  if (value === undefined || value === null) {
    return () => false;
  }
  if (multiple) {
    return (option: SelectOption) => value.includes(option.value);
  }
  return (option: SelectOption) => value === option.value;
};

type SelectFieldOptionsProps = Pick<SelectFieldPassedProps, "creatable" | "display" | "filteredOptions" | "multiple" | "onDeselect" | "onSelect" | "open" | "options" | "value">;

const SelectFieldOptions: React.FC<SelectFieldOptionsProps> = React.memo(({
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
  const currentMatcher = makeCurrentMatcher({ multiple, value });

  return (
    <DoorEffect className="chq-ffd--sl--opts" open={open}>
      {createOption && (display.length > 0) && (
        <SelectFieldOption
          key={display}
          current={false}
          onDeselect={onDeselect}
          onSelect={onSelect}
          option={{ label: `Create option: ${display}`, value: display }}
          tabIndex={open ? 0 : -1}
        />
      )}
      {filteredOptions.map(option => (
        <SelectFieldOption
          key={option.value}
          current={currentMatcher(option)}
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
});

export default SelectFieldOptions;
