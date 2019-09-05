import * as React from "react";

import classnames from "../../classnames";

type HamburgerProps = {
  className?: string;
  open?: boolean;
  onToggle: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const Hamburger = ({ className, open = false, onToggle }: HamburgerProps) => (
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
