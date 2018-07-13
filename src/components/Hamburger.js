import React from "react";
import classnames from "classnames";

const Hamburger = ({ className, open, onToggle }) => (
  <button
    type="button"
    className={classnames(className, "chq-ham", { "chq-ham-op": open })}
    onClick={onToggle}
  >
    <span />
    <span />
    <span />
  </button>
);

export default Hamburger;
