import React from "react";

import classnames from "../../classnames";
import Icon from "../Icon";

const ActionButton = ({ children, className, icon, ...props }) => (
  <button {...props} type="button" className={classnames("chq-abn", className)}>
    {icon && <><Icon icon={icon} />{" "}</>}
    {children}
  </button>
);

ActionButton.displayName = "ActionButton";

export default ActionButton;
