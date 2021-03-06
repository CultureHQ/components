import React from "react";

import classnames from "../../classnames";

type PlainButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: React.ReactNode;
  className?: string;
};

const PlainButton = React.forwardRef<HTMLButtonElement, PlainButtonProps>(
  ({ children, className, ...props }, ref) => (
    <button {...props} ref={ref} type="button" className={classnames("chq-pbn", className)}>
      {children}
    </button>
  )
);

PlainButton.displayName = "PlainButton";

export default PlainButton;
