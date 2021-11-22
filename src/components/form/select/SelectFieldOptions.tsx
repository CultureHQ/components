import React from "react";

import PlainButton from "../../buttons/PlainButton";
import DoorEffect from "../../DoorEffect";
import { SelectFieldPassedProps, SelectOption, SelectValue } from "../typings";
import Icon from "../../Icon";

type IsCreatingOptionOpts = Pick<SelectFieldPassedProps, "display" | "multiple" | "options" | "value">;

const isCreatingOption = ({ display, multiple, options, value }: IsCreatingOptionOpts) => {
  const matchedLabel = options.some(
    option => option.label.toLowerCase() === display?.toLowerCase()
  );

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
  const { label, value, icon, category } = option;
  const onClick = () => (
    current ? onDeselect : onSelect)(value, category || ""
  );

  return (
    <PlainButton aria-current={current} aria-label={`${current ? "Unselect" : "Select"} ${label}${category ? ` - ${category}` : ""}`} onClick={onClick} tabIndex={tabIndex}>
      {icon && <><Icon className="option-icon" icon={icon} />{" "}</>}
      {label}
      {category && <span className="option-category">{" "}({category})</span>}
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
    if (typeof value[0] === "string" || typeof value[0] === "number") {
      return (option: SelectOption) => (value as SelectValue[]).includes(option.value);
    }

    return (option: SelectOption) => {
      const result = (value as Array<any>).filter(item => item.value === option.value
        && option.category === item.category);
      return result.length > 0;
    };
  }
  return (option: SelectOption) => value === option.value;
};

type SelectFieldOptionsProps = Pick<SelectFieldPassedProps, "allowEmpty" | "creatable" | "creatableLabel" | "display" | "filteredOptions" | "multiple" | "onDeselect" | "onSelect" | "open" | "options" | "value">;

const SelectFieldOptions: React.FC<SelectFieldOptionsProps> = React.memo(({
  allowEmpty,
  creatable,
  creatableLabel,
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
    <div>
      {!allowEmpty && (
        <DoorEffect className="chq-ffd--sl--opts" open={open}>
          {createOption && (display?.length > 0) && (
            <SelectFieldOption
              key={display}
              current={false}
              onDeselect={onDeselect}
              onSelect={onSelect}
              option={{ label: `${creatableLabel?.length > 0 ? creatableLabel : "Create option"}: ${display}`, value: display }}
              tabIndex={open ? 0 : -1}
            />
          )}
          {filteredOptions.map(option => (
            <SelectFieldOption
              key={`${option.category}-${option.value}` as string}
              current={currentMatcher(option)}
              onDeselect={onDeselect}
              onSelect={onSelect}
              option={option}
              tabIndex={open ? 0 : -1}
            />
          ))}
          {!createOption && (filteredOptions?.length === 0) && (
            <p>No results found.</p>
          )}
        </DoorEffect>
      )}
    </div>
  );
});

export default SelectFieldOptions;
