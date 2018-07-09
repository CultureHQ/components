import React from "react";
import classnames from "classnames";

const Warning = ({ children, className, ...props }) => (
  <div className={classnames("chq-wrn", className)} {...props}>
    <p>{children}</p>
  </div>
);

export default Warning;
