import * as React from "react";

import classnames from "../classnames";
import { ContainerProps } from "../typings";

const Success = ({ children, className }: ContainerProps) => (
  <div className={classnames("chq-scs", className)}>
    <p>{children}</p>
  </div>
);

export default Success;
