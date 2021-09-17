import React from "react";

import classnames from "../../../classnames";
import Badge from "../../buttons/Badge";
import SelectFieldCaret from "./SelectFieldCaret";
import { SelectFieldPassedProps, SelectOption } from "../typings";
import Icon from "../../Icon";
import PlainButton from "../../buttons/PlainButton";

type SelectFieldMultiValueBadgeProps = Pick<SelectFieldPassedProps, "onDeselect"> & {
  option: SelectOption;
};

const SelectFieldMultiValueBadge: React.FC<SelectFieldMultiValueBadgeProps> = ({
  option,
  onDeselect
}) => {
  const MAX_LENGHT = 40;
  const { label, value, category, categoryIcon, actionButtonCallback, actionAriaLabel } = option;

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onDeselect(value, category || "");
  };

  if (categoryIcon) {
    if (actionButtonCallback) {
      return (
        <div className="option-group">
          <Badge aria-label={`Unselect ${label}`} icon="close" onClick={onClick}>
            {label.length > MAX_LENGHT ? `${label.substring(0, MAX_LENGHT)}...` : label}
            {" "}
            <Icon icon={categoryIcon} className="category-icon" />
          </Badge>
          <PlainButton aria-label={actionAriaLabel} className="option-action" onClick={() => { actionButtonCallback(value, category, label); }}>
            <Icon icon="plus" />
          </PlainButton>
          {" "}
        </div>
      );
    }

    return (
      <>
        <Badge aria-label={`Unselect ${label}`} icon="close" onClick={onClick}>
          {label.length > MAX_LENGHT ? `${label.substring(0, MAX_LENGHT)}...` : label}
          {" "}
          <Icon icon={categoryIcon} className="category-icon" />
        </Badge>
        {" "}
      </>
    );
  }

  if (typeof label === "string") {
    if (actionButtonCallback) {
      return (
        <div className="option-group">
          <Badge aria-label={`Unselect ${label}`} icon="close" onClick={onClick}>{label}</Badge>
          <PlainButton aria-label={actionAriaLabel} className="option-action" onClick={() => { actionButtonCallback(value, category, label); }}>
            <Icon icon="plus" />
          </PlainButton>
          {" "}
        </div>
      );
    }

    return (
      <>
        <Badge aria-label={`Unselect ${label}`} icon="close" onClick={onClick}>
          {label.length > MAX_LENGHT ? `${label.substring(0, MAX_LENGHT)}...` : label}
        </Badge>
        {" "}
      </>
    );
  }

  return <><Badge icon="close" /></>;
};

type SelectFieldMultiValueProps = Pick<SelectFieldPassedProps, "ariaLabel" | "disabled" | "imageIconPath" | "display" | "inputRef" | "name" | "onChange" | "onClose" | "onDeselect" | "onOpen" | "open" | "options" | "onSelected" | "onUnselected" | "placeholder" | "removePlacholder"> & {
  value: any;
};

class SelectFieldMultiValue extends React.Component<
  SelectFieldMultiValueProps, Record<string, unknown>
> {
  getCurrentOptions(): SelectOption[] {
    const { options, value } = this.props;

    if (!value) {
      return [];
    }

    return value.map((item: any) => {
      if (typeof item === "string" || typeof item === "number") {
        return options.find(option => (option.value as string) === item) // given option
        || { label: item, value: item }; // created option
      }

      return options.find(option => (option.value as string) === item.value
        && option.category === item.category) // given option
        || { label: item, value: item }; // created option
    });
  }

  handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    event.stopPropagation();
    const { display, onClose, onDeselect, onOpen, open, value } = this.props;

    switch (event.key) {
      case "Backspace":
        if (!display && value) {
          onDeselect(value[value.length - 1], "");
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
      ariaLabel, disabled, display, imageIconPath, inputRef, name, onChange,
      onDeselect, onOpen, open, onSelected, onUnselected, placeholder, removePlacholder
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
        {currentOptions.map((option, index) => {
          const { value, category } = option;
          return (
            <React.Fragment key={category ? `${category}-${value}` : value}>
              <input
                aria-label={`${name} ${index}`}
                type="hidden"
                id={`${name}[${index}]`}
                name={`${name}[]`}
                value={option.value as string}
              />
              <SelectFieldMultiValueBadge
                option={option}
                onDeselect={onDeselect}
              />
            </React.Fragment>
          );
        })}
        {imageIconPath && (
          <img className="chq-ffd--sl--icon" src={imageIconPath} alt="Input icon" />
        )}
        <input
          aria-label={ariaLabel || "Search"}
          type="text"
          className="chq-ffd--sl--match"
          disabled={disabled}
          ref={inputRef}
          onChange={onChange}
          onKeyDown={this.handleKeyDown}
          onFocus={onSelected}
          onBlur={onUnselected}
          value={display}
        />
        {placeholder && !display && !(removePlacholder && currentOptions.length >= 2) && <span className="chq-ffd--sl--place">{placeholder}</span>}
        <SelectFieldCaret open={open} />
      </div>
    );
  }
}

export default SelectFieldMultiValue;
