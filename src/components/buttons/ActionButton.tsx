import * as React from "react";

import classnames from "../../classnames";
import { HTMLContainerProps } from "../../typings";

import Icon from "../Icon";

type ActionButtonProps = React.HTMLProps<HTMLButtonElement> & {
  children?: React.ReactNode;
  className?: string;
  icon?: string;
};

const ActionButton = ({ children, className, icon, ...props }: ActionButtonProps) => (
  <button {...props} type="button" className={classnames("chq-abn", className)}>
    {icon && <><Icon icon={icon} />{" "}</>}
    {children}
  </button>
);

export default ActionButton;
