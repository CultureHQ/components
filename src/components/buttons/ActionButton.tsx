import React from "react";

import classnames from "../../classnames";

import Icon, { IconName } from "../Icon";

type ActionButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
  children?: React.ReactNode;
  className?: string;
  icon?: IconName;
};

const ActionButton: React.FC<ActionButtonProps> = ({ children, className, icon, ...props }) => (
  <button {...props} type="button" className={classnames("chq-abn", className)}>
    {icon && <><Icon icon={icon} />{" "}</>}
    {children}
  </button>
);

export default ActionButton;
