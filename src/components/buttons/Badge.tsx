import * as React from "react";

import classnames from "../../classnames";
import { HTMLContainerProps } from "../../typings";

import Icon, { IconName } from "../Icon";

type BadgeProps = HTMLContainerProps & React.HTMLAttributes<HTMLButtonElement> & {
  icon?: IconName;
  primary?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const Badge = ({ children, className, icon, primary = false, onClick, ...props }: BadgeProps) => {
  const classList = classnames("chq-bdg", className, { "chq-bdg-pr": primary });

  return (
    <button {...props} type="button" className={classList} onClick={onClick}>
      {icon && <><Icon icon={icon} />{" "}</>}
      {children}
    </button>
  );
};

export default Badge;
