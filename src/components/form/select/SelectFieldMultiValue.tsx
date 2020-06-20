import React from "react";

import classnames from "../../../classnames";
import Badge from "../../buttons/Badge";
import SelectFieldCaret from "./SelectFieldCaret";
import { SelectFieldPassedProps, SelectOption } from "../typings";
import Icon from "../../Icon";

type SelectFieldMultiValueBadgeProps = Pick<SelectFieldPassedProps, "onDeselect"> & {
  option: SelectOption;
};

const SelectFieldMultiValueBadge: React.FC<SelectFieldMultiValueBadgeProps> = ({
  option,
  onDeselect
}) => {
  const { label, value, category, categoryIcon } = option;

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onDeselect(value, category || "");
  };

  if (categoryIcon) {
    return (
      <>
        <Badge icon="close" onClick={onClick}>
          {label}
          {" "}
          <Icon icon={categoryIcon} className="category-icon" />
        </Badge>
      </>
    );
  }

  return <><Badge icon="close" onClick={onClick}>{label}</Badge>{" "}</>;
};

type SelectFieldMultiValueProps = Pick<SelectFieldPassedProps, "disabled" | "imageIconPath" | "display" | "inputRef" | "name" | "onChange" | "onClose" | "onDeselect" | "onOpen" | "open" | "options" | "onSelected" | "onUnselected" | "placeholder"> & {
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

      return options.find(option => (option.value as string) === item.value) // given option
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
      disabled, display, imageIconPath, inputRef, name, onChange, onDeselect, onOpen, open,
      onSelected, onUnselected, placeholder
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
          if (typeof option.value === "string" || typeof option.value === "number") {
            return (
              <React.Fragment key={option.value as string}>
                <input
                  aria-label={`${name} ${index}`}
                  type="hidden"
                  id={`${name}[${index}]`}
                  name={`${name}[]`}
                  value={option.value as string}
                />
                <SelectFieldMultiValueBadge option={option} onDeselect={onDeselect} />
              </React.Fragment>
            );
          }

          const { value } = option.value;
          return (
            <React.Fragment key={value as string}>
              <input
                aria-label={`${name} ${index}`}
                type="hidden"
                id={`${name}[${index}]`}
                name={`${name}[]`}
                value={value}
              />
              <SelectFieldMultiValueBadge option={option} onDeselect={onDeselect} />
            </React.Fragment>
          );
        })}
        {imageIconPath && (
          <img className="chq-ffd--sl--icon" src={imageIconPath} alt="Input icon" />
        )}
        <input
          aria-label="Search"
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
        {placeholder && !display && <span className="chq-ffd--sl--place">{placeholder}</span>}
        <SelectFieldCaret open={open} />
      </div>
    );
  }
}

export default SelectFieldMultiValue;
