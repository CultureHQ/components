import * as React from "react";

import classnames from "../classnames";
import { HTMLContainerProps } from "../types";

const Warning = ({ children, className }: HTMLContainerProps) => (
  <div className={classnames("chq-wrn", className)}>
    <p>{children}</p>
  </div>
);

export default Warning;
