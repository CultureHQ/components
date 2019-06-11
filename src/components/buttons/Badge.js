import React from "react";

import classnames from "../../classnames";
import Icon from "../Icon";

const Badge = ({ children, className, icon, primary = false, onClick, ...props }) => {
  const classList = classnames("chq-bdg", className, { "chq-bdg-pr": primary });

  return (
    <button {...props} type="button" className={classList} onClick={onClick}>
      {icon && <><Icon icon={icon} />{" "}</>}
      {children}
    </button>
  );
};

export default Badge;
