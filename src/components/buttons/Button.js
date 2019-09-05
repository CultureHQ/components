import React from "react";

import classnames from "../../classnames";

import Icon from "../Icon";

const ButtonIcon = ({ icon, loading }) => (
  <>
    <Icon icon={loading ? "load-c" : icon} />
    {" "}
  </>
);

const Button = ({
  as: Element = "button",
  children,
  className = undefined,
  type = "button",
  icon = null,
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
