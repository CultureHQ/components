import React, { useRef } from "react";

import classnames from "../classnames";
import useAutoFocus from "../utils/useAutoFocus";

type CheckmarkProps = {
  autoFocus?: boolean;
  checked?: boolean;
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: (checked: boolean) => void;
};

const Checkmark: React.FC<CheckmarkProps> = ({
  autoFocus, children, className, checked, disabled, onClick
}) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const onButtonClick = onClick ? () => onClick(!checked) : undefined;

  useAutoFocus(autoFocus, buttonRef);

  return (
    <button
      ref={buttonRef}
      type="button"
      className={classnames("chq-cmk", className, {
        "chq-cmk-ck": checked || false,
        "chq-cmk-cl": !!onClick
      })}
      disabled={disabled}
      onClick={onButtonClick}
      aria-label={children ? undefined : "Checkmark"}
    >
      <svg viewBox="0 0 52 52">
        <circle cx="26" cy="26" r="25" fill="none" />
        <path fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
      </svg>
      {children && <>{" "}{children}</>}
    </button>
  );
};

export default Checkmark;
