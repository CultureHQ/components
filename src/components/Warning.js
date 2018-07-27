import React from "react";
import classnames from "classnames";

const Warning = ({ children, className }) => (
  <div className={classnames(className, "chq-wrn")}>
    <p>{children}</p>
  </div>
);

export default Warning;
