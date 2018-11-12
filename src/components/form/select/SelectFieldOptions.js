import React from "react";

import classnames from "../../../classnames";
import PlainButton from "../../buttons/PlainButton";
import DoorEffect from "../../DoorEffect";

const SelectFieldOption = ({ active, option, onDeselect, onSelect, tabIndex }) => {
  const { label, value } = option;
  const onClick = () => (active ? onDeselect : onSelect)(value);

  return (
    <PlainButton className={classnames({ "chq-ffd--sl--opt-act": active })} onClick={onClick} tabIndex={tabIndex}>
      {label}
    </PlainButton>
  );
};

const SelectFieldOptions = ({
  creatable, display, filteredOptions, multiple, onDeselect, onSelect, open, value
}) => {
  const createOption = multiple ? !value.includes(display) : (display !== value);

  return (
    <DoorEffect className="chq-ffd--sl--opts" open={open}>
      {creatable && (display.length > 0) && createOption && (
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
          active={multiple ? value.includes(option.value) : option.value === value}
          tabIndex={open ? 0 : -1}
        />
      ))}
      {!creatable && (filteredOptions.length === 0) && createOption && (
        <p>No results found.</p>
      )}
    </DoorEffect>
  );
};

export default SelectFieldOptions;
