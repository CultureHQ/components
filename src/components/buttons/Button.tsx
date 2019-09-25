import * as React from "react";

import classnames from "../../classnames";

import Icon, { IconName } from "../Icon";

type ButtonIconProps = {
  icon?: IconName;
  loading: boolean;
};

const ButtonIcon: React.FC<ButtonIconProps> = ({ icon, loading }) => (
  <>
    <Icon icon={(loading ? "load-c" : icon) as IconName} />
    {" "}
  </>
);

type ButtonCommonProps = {
  children?: React.ReactNode;
  className?: string;
  icon?: IconName;
  fillParent?: boolean;
  inverted?: boolean;
  primary?: boolean;
  small?: boolean;
  loading?: boolean;
  danger?: boolean;
};

type ButtonProps<P extends any = any> = ButtonCommonProps & (
  ({ as: React.ComponentType<P> } & P)
  | ({ as: undefined | "button" } & React.ButtonHTMLAttributes<HTMLButtonElement>)
);

const Button: React.FC<ButtonProps> = ({
  as: Element = "button",
  children,
  className,
  type = "button",
  icon,
  fillParent = false,
  inverted = false,
  primary = false,
  small = false,
  loading = false,
  danger = false,
  ...props
}) => {
  const buttonProps = {
    ...props,
    className: classnames("chq-btn", className, {
      "chq-btn-fp": fillParent,
      "chq-btn-iv": inverted,
      "chq-btn-pr": primary,
      "chq-btn-sm": small,
      "chq-btn-ld": loading,
      "chq-btn-dg": danger
    })
  };

  if (Element === "button") {
    buttonProps.type = type;
  }

  return (
    <Element {...buttonProps}>
      {(loading || icon) && <ButtonIcon icon={icon} loading={loading} />}
      {children}
    </Element>
  );
};

export default Button;
