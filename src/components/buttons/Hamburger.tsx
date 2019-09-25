import * as React from "react";

import classnames from "../../classnames";

type HamburgerProps = {
  className?: string;
  open?: boolean;
  onToggle: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const Hamburger: React.FC<HamburgerProps> = ({ className, open = false, onToggle }) => (
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
