import React from "react";

import classnames from "../../classnames";
import Icon from "../Icon";

const Badge = ({ children, className, icon, primary = false, onClick }) => (
  <button
    type="button"
    className={classnames("chq-bdg", className, { "chq-bdg-pr": primary })}
    onClick={onClick}
  >
    {icon && <><Icon icon={icon} />{" "}</>}
    {children}
  </button>
);

export default Badge;
