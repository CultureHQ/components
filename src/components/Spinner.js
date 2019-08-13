import React from "react";

import classnames from "../classnames";
import Circles from "./Circles";

const Spinner = ({ className, ...props }) => (
  <div className={classnames("chq-spn", className)} {...props}>
    <Circles />
  </div>
);

export default Spinner;
