import React, { useCallback, useContext, useMemo, useState } from "react";
import { useClickOutside } from "@culturehq/hooks";

import classnames from "../classnames";
import Button from "./buttons/Button";

type DropdownState = {
  open: boolean;
  onToggle: () => void;
};

const DropdownContext = React.createContext<DropdownState>({
  open: false,
  onToggle: () => {}
});

const DropdownCheck: React.FC = () => (
  <svg aria-hidden data-chq-dropdown-check viewBox="0 0 16 16">
    <circle r="7" cx="8" cy="8" />
    <path d="M 5 9 l 2 2 l 4 -5" />
  </svg>
);

type DropdownButtonProps = React.ComponentProps<typeof Button>;

const DropdownButton: React.FC<DropdownButtonProps> = ({ children, ...props }) => {
  const { open, onToggle } = useContext(DropdownContext);

  return (
    <Button inverted {...props} aria-haspopup="listbox" onClick={onToggle}>
      {children}
      <span
        aria-hidden
        className={classnames("chq-dd--caret", { "chq-dd--caret-ex": open })}
      />
    </Button>
  );
};

type DropdownListBoxProps = React.HTMLAttributes<HTMLUListElement> & {
  children: React.ReactNode;
};

const DropdownListBox: React.FC<DropdownListBoxProps> = ({ children, ...props }) => {
  const { open } = useContext(DropdownContext);

  return (
    <ul {...props} aria-expanded={open} role="listbox">
      {children}
    </ul>
  );
};

type DropdownOptionProps = React.HTMLAttributes<HTMLLIElement> & {
  children: React.ReactNode;
};

const DropdownOption: React.FC<DropdownOptionProps> = ({ children, ...props }) => {
  const { open, onToggle } = useContext(DropdownContext);

  const onClick = () => {
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
      onClick={onClick}
      onKeyDown={onKeyDown}
      role="option"
      tabIndex={open ? 0 : -1}
    >
      {props["aria-selected"] && <DropdownCheck />}
      {children}
    </li>
  );
};

type DropdownProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
};

const Dropdown = ({ children, className, ...props }: DropdownProps) => {
  const [open, setOpen] = useState<boolean>(false);

  const onClose = useCallback(() => setOpen(false), [setOpen]);
  const containerRef = useClickOutside<HTMLDivElement>(onClose);

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      onClose();
    }
  };

  const context = useMemo(
    () => ({
      open,
      onToggle: () => setOpen(value => !value)
    }),
    [open, setOpen]
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
