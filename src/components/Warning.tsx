import * as React from "react";

import classnames from "../classnames";
import { ContainerProps } from "../typings";

const Warning = ({ children, className }: ContainerProps) => (
  <div className={classnames("chq-wrn", className)}>
    <p>{children}</p>
  </div>
);

export default Warning;
