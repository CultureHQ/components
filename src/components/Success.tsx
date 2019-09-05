import * as React from "react";

import classnames from "../classnames";
import { HTMLContainerProps } from "../typings";

const Success = ({ children, className }: HTMLContainerProps) => (
  <div className={classnames("chq-scs", className)}>
    <p>{children}</p>
  </div>
);

export default Success;
