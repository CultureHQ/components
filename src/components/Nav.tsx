import * as React from "react";
import { useWindowEvent } from "@culturehq/hooks";

import classnames from "../classnames";
import { HTMLContainerProps } from "../typings";

const makeUpdate = current => {
  const scroll = window.pageYOffset;

  return {
    displayed: current.scroll === 0 || scroll <= 30 || current.scroll > scroll,
    scroll
  };
};

type NavProps = HTMLContainerProps & React.HTMLAttributes<HTMLElement>;

const Nav = ({ children, className, ...props }: NavProps) => {
  const [state, setState] = React.useState(() => ({
    displayed: true,
    scroll: window.pageYOffset
  }));

  useWindowEvent(
    "scroll",
    React.useCallback(() => setState(makeUpdate), [setState])
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
