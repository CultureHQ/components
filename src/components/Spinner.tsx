import React from "react";

import classnames from "../classnames";
import Circles from "./Circles";

type SpinnerProps = React.HTMLAttributes<HTMLDivElement> & {
  className?: string;
};

const Spinner: React.FC<SpinnerProps> = ({ className, ...props }) => (
  <div className={classnames("chq-spn", className)} {...props}>
    <Circles />
  </div>
);

Spinner.defaultProps = {
  className: undefined
};

export default Spinner;
