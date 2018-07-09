import React from "react";
import classnames from "classnames";

const Info = ({ children, className, ...props }) => (
  <div className={classnames(className, "chq-inf")} {...props}>
    <p>{children}</p>
  </div>
);

export default Info;
