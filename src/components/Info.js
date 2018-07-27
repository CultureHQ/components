import React from "react";
import classnames from "classnames";

const Info = ({ children, className }) => (
  <div className={classnames(className, "chq-inf")}>
    <p>{children}</p>
  </div>
);

export default Info;
