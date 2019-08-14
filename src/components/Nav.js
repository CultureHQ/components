import React, { useEffect, useReducer } from "react";

import classnames from "../classnames";

const makeInitialState = () => ({
  displayed: true,
  scroll: window.pageYOffset
});

const reducer = (state, action) => {
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

const Nav = ({ children, className, ...props }) => {
  const [state, dispatch] = useReducer(reducer, null, makeInitialState);

  useEffect(
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
