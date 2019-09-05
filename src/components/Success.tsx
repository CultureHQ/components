import * as React from "react";

import classnames from "../classnames";

type SuccessProps = {
  children: React.ReactNode;
  className?: string;
};

const Success = ({ children, className }: SuccessProps) => (
  <div className={classnames("chq-scs", className)}>
    <p>{children}</p>
  </div>
);

export default Success;
