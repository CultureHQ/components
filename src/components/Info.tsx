import * as React from "react";

import classnames from "../classnames";
import { ContainerProps } from "../typings";

const Info = ({ children, className }: ContainerProps) => (
  <div className={classnames("chq-inf", className)}>
    <p>{children}</p>
  </div>
);

export default Info;
