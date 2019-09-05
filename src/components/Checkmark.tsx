import * as React from "react";

import classnames from "../classnames";
import { HTMLContainerProps } from "../typings";

type CheckmarkProps = HTMLContainerProps & {
  checked?: boolean;
  onClick?: (checked: boolean) => void;
};

const Checkmark = ({ children, className, checked, onClick }: CheckmarkProps) => {
  const onButtonClick = onClick ? () => onClick(!checked) : undefined;

  return (
    <button
      type="button"
      className={classnames("chq-cmk", className, {
        "chq-cmk-ck": checked || false,
        "chq-cmk-cl": !!onClick
      })}
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
