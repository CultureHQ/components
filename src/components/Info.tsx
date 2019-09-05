import * as React from "react";

import classnames from "../classnames";
import { HTMLContainerProps } from "../typings";

const Info = ({ children, className }: HTMLContainerProps) => (
  <div className={classnames("chq-inf", className)}>
    <p>{children}</p>
  </div>
);

export default Info;
