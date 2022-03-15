import React from "react";

import classnames from "../classnames";

type NavProps = React.HTMLAttributes<HTMLElement> & {
  children: React.ReactNode;
  className?: string;
};

const Nav: React.FC<NavProps> = ({ children, className, ...props }) => (
  <nav className={classnames("chq-nav", className)} {...props}>
    {children}
  </nav>
);

Nav.defaultProps = {
  className: undefined
};

export default Nav;
