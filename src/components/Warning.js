import React from "react";
import classnames from "classnames";

const Warning = ({ children, className, ...props }) => (
  <div className={classnames(className, "chq-wrn")} {...props}>
    <p>{children}</p>
  </div>
);

export default Warning;
