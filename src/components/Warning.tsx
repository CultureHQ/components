import * as React from "react";

import classnames from "../classnames";

type WarningProps = {
  children?: React.ReactNode;
  className?: string;
};

const Warning = ({ children, className }: WarningProps) => (
  <div className={classnames("chq-wrn", className)}>
    <p>{children}</p>
  </div>
);

export default Warning;
