import React from "react";

import classnames from "../classnames";

const Hamburger = ({ className, open, onToggle }) => (
  <button
    type="button"
    className={classnames("chq-ham", className, { "chq-ham-op": open })}
    onClick={onToggle}
    aria-label="Menu Toggle"
  >
    <span />
    <span />
    <span />
  </button>
);

export default Hamburger;
