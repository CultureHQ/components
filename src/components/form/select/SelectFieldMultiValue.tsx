import React from "react";

import classnames from "../../../classnames";
import Badge from "../../buttons/Badge";
import SelectFieldCaret from "./SelectFieldCaret";
import { SelectFieldPassedProps, SelectValue, SelectOption } from "../typings";

type SelectFieldMultiValueBadgeProps = Pick<SelectFieldPassedProps, "onDeselect"> & {
  option: SelectOption;
};

const SelectFieldMultiValueBadge: React.FC<SelectFieldMultiValueBadgeProps> = ({
  option,
  onDeselect
}) => {
  const { label, value } = option;

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onDeselect(value);
  };

  return <><Badge icon="close" onClick={onClick}>{label}</Badge>{" "}</>;
};

type SelectFieldMultiValueProps = Pick<SelectFieldPassedProps, "disabled" | "display" | "inputRef" | "name" | "onChange" | "onClose" | "onDeselect" | "onOpen" | "open" | "options" | "placeholder"> & {
  value: null | SelectValue[];
};

class SelectFieldMultiValue extends React.Component<
  SelectFieldMultiValueProps, Record<string, unknown>
> {
  getCurrentOptions(): SelectOption[] {
    const { options, value } = this.props;

    if (!value) {
      return [];
    }

    return value.map(item => (
      options.find(option => option.value === item) // given option
      || { label: item, value: item } // created option
    ));
  }

  handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    event.stopPropagation();
    const { display, onClose, onDeselect, onOpen, open, value } = this.props;

    switch (event.key) {
      case "Backspace":
        if (!display && value) {
          onDeselect(value[value.length - 1]);
        }
        break;
      case "Enter":
        if (!open) {
          onOpen();
        }
        break;
      case "Escape":
        if (open) {
          onClose();
        }
        break;
      default:
        break;
    }
  };

  render(): React.ReactElement {
    const {
      disabled, display, inputRef, name, onChange, onDeselect, onOpen, open,
      placeholder
    } = this.props;

    const className = classnames("chq-ffd--ctrl", { "chq-ffd--ctrl-fc": open });
    const currentOptions = this.getCurrentOptions();

    return (
      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        onClick={disabled ? undefined : onOpen}
        onKeyDown={this.handleKeyDown}
        className={className}
      >
        {currentOptions.map((option, index) => (
          <React.Fragment key={option.value}>
            <input
              aria-label={`${name} ${index}`}
              type="hidden"
              id={`${name}[${index}]`}
              name={`${name}[]`}
              value={option.value}
            />
            <SelectFieldMultiValueBadge option={option} onDeselect={onDeselect} />
          </React.Fragment>
        ))}
        <input
          aria-label="Search"
          type="text"
          className="chq-ffd--sl--match"
          disabled={disabled}
          ref={inputRef}
          onChange={onChange}
          onKeyDown={this.handleKeyDown}
          value={display}
        />
        {placeholder && !display && <span className="chq-ffd--sl--place">{placeholder}</span>}
        <SelectFieldCaret open={open} />
      </div>
    );
  }
}

export default SelectFieldMultiValue;
