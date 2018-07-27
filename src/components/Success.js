import React from "react";
import classnames from "classnames";

const Success = ({ children, className }) => (
  <div className={classnames(className, "chq-scs")}>
    <p>{children}</p>
  </div>
);

export default Success;
