import * as React from "react";

import classnames from "../classnames";
import { HTMLContainerProps } from "../typings";

const makeInitialState = () => ({
  displayed: true,
  scroll: window.pageYOffset
});

type NavState = { displayed: boolean, scroll: number };
type NavAction = { type: "scroll", scroll: number };

const reducer = (state: NavState, action: NavAction) => {
  switch (action.type) {
    case "scroll":
      return {
        ...state,
        displayed: state.scroll === 0 || action.scroll <= 30 || state.scroll > action.scroll,
        scroll: action.scroll
      };
    default:
      throw new Error();
  }
};

type NavProps = HTMLContainerProps & React.HTMLProps<HTMLElement>;

const Nav = ({ children, className, ...props }: NavProps) => {
  const [state, dispatch] = React.useReducer<typeof reducer, null>(reducer, null, makeInitialState);

  React.useEffect(
    () => {
      const onScroll = () => {
        dispatch({ type: "scroll", scroll: window.pageYOffset });
      };

      window.addEventListener("scroll", onScroll);
      return () => window.removeEventListener("scroll", onScroll);
    },
    [dispatch]
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
