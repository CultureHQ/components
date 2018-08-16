import React from "react";
import classnames from "classnames";

const Spinner = ({ className }) => (
  <div className={classnames(className, "chq-spn")}><div /></div>
);

export default Spinner;
