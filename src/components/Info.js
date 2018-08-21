import React from "react";
import classnames from "classnames";

const Info = ({ children, className }) => (
  <div className={classnames("chq-inf", className)}>
    <p>{children}</p>
  </div>
);

export default Info;
