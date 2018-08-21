import React from "react";
import classnames from "classnames";

const Spinner = ({ className }) => (
  <div className={classnames("chq-spn", className)}><div /></div>
);

export default Spinner;
