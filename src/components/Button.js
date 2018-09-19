import React, { Fragment } from "react";

import classnames from "../classnames";

import Icon from "./Icon";

const ButtonIcon = ({ icon, loading }) => (
  <Fragment>
    <Icon icon={loading ? "load-c" : icon} />{" "}
  </Fragment>
);

const Button = ({
  children,
  className,
  type = "button",
  icon,
  inverted,
  primary,
  small,
  loading,
  danger,
  ...props
}) => (
  <button // eslint-disable-line react/button-has-type
    {...props}
    type={type}
    className={
      classnames("chq-btn", className, {
        "chq-btn-iv": inverted,
        "chq-btn-pr": primary,
        "chq-btn-sm": small,
        "chq-btn-ld": loading,
        "chq-btn-dg": danger
      })
    }
  >
    {(loading || icon) && <ButtonIcon icon={icon} loading={loading} />}
    {children}
  </button>
);

export default Button;
