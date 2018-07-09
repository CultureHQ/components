import React from "react";
import classnames from "classnames";

const Badge = ({
  children, className, primary = false, ...props
}) => (
  <button
    className={classnames(className, "chq-bdg", { "chq-bdg-pr": primary })}
    {...props}
  >
    {children}
  </button>
);

export default Badge;
