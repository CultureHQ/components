import * as React from "react";

import classnames from "../../classnames";
import { OptionalContainerProps } from "../../typings";

import Icon, { IconName } from "../Icon";

type ActionButtonProps = React.HTMLAttributes<HTMLButtonElement> & OptionalContainerProps & {
  icon?: IconName;
};

const ActionButton = ({ children, className, icon, ...props }: ActionButtonProps) => (
  <button {...props} type="button" className={classnames("chq-abn", className)}>
    {icon && <><Icon icon={icon} />{" "}</>}
    {children}
  </button>
);

export default ActionButton;
