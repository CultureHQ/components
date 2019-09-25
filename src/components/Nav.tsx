import React, { useCallback, useState } from "react";
import { useWindowEvent } from "@culturehq/hooks";

import classnames from "../classnames";

type NavState = {
  displayed: boolean;
  scroll: number;
};

const updateState = (state: NavState) => {
  const scroll = window.pageYOffset;

  return {
    displayed: state.scroll === 0 || scroll <= 30 || state.scroll > scroll,
    scroll
  };
};

type NavProps = React.HTMLAttributes<HTMLElement> & {
  children: React.ReactNode;
  className?: string;
};

const Nav: React.FC<NavProps> = ({ children, className, ...props }) => {
  const [state, setState] = useState<NavState>(() => ({
    displayed: true,
    scroll: window.pageYOffset
  }));

  useWindowEvent(
    "scroll",
    useCallback(() => setState(updateState), [setState])
  );

  return (
    <nav
      aria-hidden={!state.displayed}
      className={classnames("chq-nav", className)}
      {...props}
    >
      {children}
    </nav>
  );
};

export default Nav;
