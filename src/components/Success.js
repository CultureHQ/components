import React from "react";
import classnames from "classnames";

const Success = ({ children, className }) => (
  <div className={classnames("chq-scs", className)}>
    <p>{children}</p>
  </div>
);

export default Success;
