import React from "react";

import classnames from "../../../classnames";
import PlainButton from "../../buttons/PlainButton";
import DoorEffect from "../../DoorEffect";

const isCreatingOption = ({ display, multiple, options, value }) => {
  const matchedLabel = options.some(option => option.label === display);

  if (!multiple) {
    return !matchedLabel && display !== value;
  }
  return !matchedLabel && (!value || !value.some(item => item === display));
};

const SelectFieldOption = ({ active, option, onDeselect, onSelect, tabIndex }) => {
  const { label, value } = option;

  const className = classnames({ "chq-ffd--sl--opt-act": active });
  const onClick = () => (active ? onDeselect : onSelect)(value);

  return (
    <PlainButton className={className} onClick={onClick} tabIndex={tabIndex}>
      {label}
    </PlainButton>
  );
};

const SelectFieldOptions = ({
  creatable, display, filteredOptions, multiple, onDeselect, onSelect, open, options, value
}) => {
  const createOption = creatable && isCreatingOption({ display, multiple, options, value });

  return (
    <DoorEffect className="chq-ffd--sl--opts" open={open}>
      {createOption && (display.length > 0) && (
        <SelectFieldOption
          key={display}
          option={{ label: `Create option: ${display}`, value: display }}
          onSelect={onSelect}
        />
      )}
      {filteredOptions.map(option => (
        <SelectFieldOption
          key={option.value}
          option={option}
          onDeselect={onDeselect}
          onSelect={onSelect}
          active={value && (multiple ? value.includes(option.value) : option.value === value)}
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
