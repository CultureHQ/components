import * as React from "react";
import { useWindowEvent } from "@culturehq/hooks";

import classnames from "../classnames";
import { ContainerProps } from "../typings";

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

type NavProps = ContainerProps & React.HTMLAttributes<HTMLElement>;

const Nav = ({ children, className, ...props }: NavProps) => {
  const [state, setState] = React.useState<NavState>(() => ({
    displayed: true,
    scroll: window.pageYOffset
  }));

  useWindowEvent(
    "scroll",
    React.useCallback(() => setState(updateState), [setState])
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
