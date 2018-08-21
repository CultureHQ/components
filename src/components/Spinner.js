import React from "react";
import classnames from "classnames";

const Spinner = ({ className, placeholder }) => (
  <div
    className={classnames("chq-spn", className, { "chq-spn-ph": placeholder })}
  >
    <div />
  </div>
);

export default Spinner;
