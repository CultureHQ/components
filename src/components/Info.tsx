import React from "react";

import classnames from "../classnames";

type InfoProps = {
  children: React.ReactNode;
  className?: string;
};

const Info: React.FC<InfoProps> = ({ children, className }) => (
  <div className={classnames("chq-inf", className)}>
    <p>{children}</p>
  </div>
);

Info.defaultProps = {
  className: undefined
};

export default Info;
