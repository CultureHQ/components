import React from "react";
import classnames from "classnames";

const Badge = ({
  children, className, primary = false, onClick
}) => (
  <button
    type="button"
    className={classnames("chq-bdg", className, { "chq-bdg-pr": primary })}
    onClick={onClick}
  >
    {children}
  </button>
);

export default Badge;
