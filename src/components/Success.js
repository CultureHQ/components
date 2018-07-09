import React from "react";
import classnames from "classnames";

const Success = ({ children, className, ...props }) => (
  <div className={classnames(className, "chq-scs")} {...props}>
    <p>{children}</p>
  </div>
);

export default Success;
