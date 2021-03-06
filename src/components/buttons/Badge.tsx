import React from "react";

import classnames from "../../classnames";

import Icon, { IconName } from "../Icon";

type BadgeProps = React.HTMLAttributes<HTMLButtonElement> & {
  children?: React.ReactNode;
  className?: string;
  icon?: IconName;
  primary?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const Badge: React.FC<BadgeProps> = ({
  children,
  className,
  icon,
  primary = false,
  onClick,
  ...props
}) => {
  const classList = classnames("chq-bdg", className, { "chq-bdg-pr": primary });

  if (onClick) {
    return (
      <button {...props} type="button" className={classList} onClick={onClick}>
        {icon && <><Icon icon={icon} />{" "}</>}
        {children}
      </button>
    );
  }

  return (
    <span {...props} className={classList}>
      {icon && <><Icon icon={icon} />{" "}</>}
      {children}
    </span>
  );
};

export default Badge;
