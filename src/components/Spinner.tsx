import * as React from "react";

import classnames from "../classnames";
import Circles from "./Circles";

type SpinnerProps = React.HTMLProps<HTMLDivElement> & {
  className?: string;
};

const Spinner = ({ className, ...props }: SpinnerProps) => (
  <div className={classnames("chq-spn", className)} {...props}>
    <Circles />
  </div>
);

export default Spinner;
