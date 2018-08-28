import React from "react";

import classnames from "../classnames";

const Warning = ({ children, className }) => (
  <div className={classnames("chq-wrn", className)}>
    <p>{children}</p>
  </div>
);

export default Warning;
