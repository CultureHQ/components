import React from "react";

import SelectFieldCaret from "./SelectFieldCaret";
import { SelectFieldPassedProps, SelectValue } from "../typings";

type SelectFieldSingleValueProps = Pick<SelectFieldPassedProps, "disabled" | "display" | "inputRef" | "name" | "onChange" | "onClose" | "onOpen" | "open" | "onSelected" | "placeholder"> & {
  value: null | SelectValue;
};

const SelectFieldSingleValue: React.FC<SelectFieldSingleValueProps> = React.memo(({
  disabled,
  display,
  inputRef,
  name,
  onChange,
  onClose,
  onOpen,
  open,
  onSelected,
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

  return (
    <>
      <input
        aria-label={name}
        type="hidden"
        disabled={disabled}
        id={name}
        name={name}
        value={value || ""}
      />
      <input
        aria-label="Value"
        type="text"
        ref={inputRef}
        className="chq-ffd--ctrl"
        disabled={disabled}
        onClick={onOpen}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onFocus={onSelected}
        placeholder={placeholder}
        value={display}
      />
      <SelectFieldCaret open={open} />
    </>
  );
});

export default SelectFieldSingleValue;
