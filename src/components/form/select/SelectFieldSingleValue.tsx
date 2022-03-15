import React from "react";

import SelectFieldCaret from "./SelectFieldCaret";
import { SelectFieldPassedProps, SelectValue } from "../typings";

type SelectFieldSingleValueProps = Pick<SelectFieldPassedProps, "ariaLabel" | "childIsLabel" | "disabled" | "display" | "fixedValue" | "imageIconPath" | "inputRef" | "name" | "onChange" | "onClose" | "onCloseAction" | "onOpen" | "open" | "onSelected" | "onUnselected" | "placeholder"> & {
  value: null | SelectValue;
};

const SelectFieldSingleValue: React.FC<SelectFieldSingleValueProps> = React.memo(({
  ariaLabel,
  childIsLabel,
  disabled,
  display,
  fixedValue,
  imageIconPath,
  inputRef,
  name,
  onChange,
  onClose,
  onCloseAction,
  onOpen,
  open,
  onSelected,
  onUnselected,
  placeholder,
  value
}) => {
  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
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

  const onClick = () => {
    if (!childIsLabel && onCloseAction && open) {
      onClose();
      onCloseAction();
      return;
    }
    onOpen();
  };

  const classes = fixedValue ? "chq-ffd--ctrl chq-ffd--ctrl--fixed-value" : "chq-ffd--ctrl";

  return (
    <>
      {imageIconPath && (
        <img className="chq-ffd--sl--icon" src={imageIconPath} alt="Input icon" />
      )}
      <input
        aria-label={name}
        type="hidden"
        disabled={disabled}
        id={name}
        name={name}
        value={value || ""}
      />
      <input
        aria-label={ariaLabel || "Value"}
        type="text"
        ref={inputRef}
        className={classes}
        disabled={disabled}
        onClick={onClick}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onFocus={onSelected}
        onBlur={onUnselected}
        placeholder={placeholder}
        value={display}
        style={imageIconPath ? { paddingLeft: "40px" } : {}}
      />
      <SelectFieldCaret open={open} />
    </>
  );
});

export default SelectFieldSingleValue;
