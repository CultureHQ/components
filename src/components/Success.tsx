import React from "react";

import classnames from "../classnames";

type SuccessProps = {
  children: React.ReactNode;
  className?: string;
};

const Success: React.FC<SuccessProps> = ({ children, className }) => (
  <div className={classnames("chq-scs", className)}>
    <p>{children}</p>
  </div>
);

export default Success;
