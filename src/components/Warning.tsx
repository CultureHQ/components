import React from "react";

import classnames from "../classnames";

type WarningProps = {
  children: React.ReactNode;
  className?: string;
  role?: string;
};

const Warning: React.FC<WarningProps> = ({ children, className, role }) => (
  <div className={classnames("chq-wrn", className)}>
    <p role={role || undefined}>{children}</p>
  </div>
);

Warning.defaultProps = {
  className: undefined,
  role: undefined
};

export default Warning;
