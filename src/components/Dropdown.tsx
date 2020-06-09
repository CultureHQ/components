import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useClickOutside } from "@culturehq/hooks";

import classnames from "../classnames";
import useId from "../utils/useId";

import Button from "./buttons/Button";

type DropdownValue = string;

type DropdownState = {
  buttonId: string;
  buttonRef: React.RefObject<HTMLButtonElement>;
  onChange: (value: DropdownValue) => void;
  onToggle: () => void;
  open: boolean | null;
  selected: DropdownValue | null;
};

const DropdownContext = React.createContext<DropdownState>({
  buttonId: "chq-0",
  buttonRef: React.createRef<HTMLButtonElement>(),
  onChange: () => {},
  onToggle: () => {},
  open: false,
  selected: null
});

const DropdownCheck: React.FC = () => (
  <svg aria-hidden data-chq-dropdown-check viewBox="0 0 16 16">
    <circle r="7" cx="8" cy="8" />
    <path d="M 5 9 l 2 2 l 4 -5" />
  </svg>
);

type DropdownButtonProps = React.ComponentProps<typeof Button>;

const DropdownButton: React.FC<DropdownButtonProps> = ({ children, ...props }) => {
  const { buttonId, buttonRef, open, onToggle } = useContext(DropdownContext);

  return (
    <Button
      {...props}
      aria-haspopup="listbox"
      id={buttonId}
      inverted
      onClick={onToggle}
      ref={buttonRef}
    >
      {children}
      <span
        aria-hidden
        className={classnames("chq-dd--caret", { "chq-dd--caret-ex": !!open })}
      />
    </Button>
  );
};

type DropdownListBoxProps = React.HTMLAttributes<HTMLUListElement> & {
  children: React.ReactNode;
};

const DropdownListBox: React.FC<DropdownListBoxProps> = ({ children, ...props }) => {
  const { buttonId, open } = useContext(DropdownContext);

  return (
    <ul {...props} aria-expanded={!!open} aria-labelledby={buttonId} role="listbox">
      {children}
    </ul>
  );
};

type DropdownOptionProps = React.HTMLAttributes<HTMLLIElement> & {
  children: React.ReactNode;
  value: DropdownValue;
};

const DropdownOption: React.FC<DropdownOptionProps> = ({ children, value, ...props }) => {
  const { open, onChange, onToggle, selected } = useContext(DropdownContext);

  const onClick = () => {
    onChange(value);
    onToggle();
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLLIElement>) => {
    if (event.key === "Enter") {
      onClick();
    }
  };

  return (
    <li
      {...props}
      aria-selected={value === selected}
      onClick={onClick}
      onKeyDown={onKeyDown}
      role="option"
      tabIndex={open ? 0 : -1}
    >
      {value === selected && <DropdownCheck />}
      {children}
    </li>
  );
};

type DropdownProps = Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> & {
  children: React.ReactNode;
  onChange: (value: DropdownValue) => void;
  selected: DropdownValue | null;
};

type DropdownComponent = React.FC<DropdownProps> & {
  Button: typeof DropdownButton;
  ListBox: typeof DropdownListBox;
  Option: typeof DropdownOption;
};

// Disabling the following rule because the top-level div is just capturing all
// keyboard events from the button or from the list elements, and it's better to
// just keep it here are the top level. See:
// https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-static-element-interactions.md#case-the-event-handler-is-only-being-used-to-capture-bubbled-events
/* eslint-disable jsx-a11y/no-static-element-interactions */
const Dropdown: DropdownComponent = ({ children, className, onChange, selected, ...props }) => {
  const [open, setOpen] = useState<DropdownState["open"]>(null);
  const onClose = useCallback(() => setOpen(false), [setOpen]);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const buttonId = useId();

  useEffect(
    () => {
      if (open === false && buttonRef.current) {
        buttonRef.current.focus();
      }
    },
    [buttonRef, open, setOpen]
  );

  const containerRef = useClickOutside<HTMLDivElement>(onClose);

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      onClose();
    }
  };

  const context = useMemo(
    () => ({
      buttonId,
      buttonRef,
      onChange,
      onToggle: () => setOpen(value => !value),
      open,
      selected
    }),
    [buttonId, buttonRef, onChange, open, setOpen, selected]
  );

  return (
    <DropdownContext.Provider value={context}>
      <div
        {...props}
        className={classnames("chq-dd", className)}
        onKeyDown={onKeyDown}
        ref={containerRef}
      >
        {children}
      </div>
    </DropdownContext.Provider>
  );
};

Dropdown.Button = DropdownButton;
Dropdown.ListBox = DropdownListBox;
Dropdown.Option = DropdownOption;

export default Dropdown;
