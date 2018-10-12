import React from "react";

import classnames from "../../classnames";

const Button = ({ children, className, ...props }) => (
  <button {...props} type="button" className={classnames("chq-pbn", className)}>
    {children}
  </button>
);

export default Button;
