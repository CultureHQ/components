import React from "react";

import classnames from "../classnames";
import Circles from "./Circles";

const Spinner = ({ className }) => (
  <div className={classnames("chq-spn", className)}>
    <Circles />
  </div>
);

export default Spinner;
