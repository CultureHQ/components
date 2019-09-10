import * as React from "react";

import classnames from "../../classnames";
import { ContainerProps } from "../../typings";

type PlainButtonProps = ContainerProps & React.HTMLAttributes<HTMLButtonElement>;

const PlainButton = React.forwardRef<HTMLButtonElement, PlainButtonProps>(
  ({ children, className, ...props }, ref) => (
    <button {...props} ref={ref} type="button" className={classnames("chq-pbn", className)}>
      {children}
    </button>
  )
);

PlainButton.displayName = "PlainButton";

export default PlainButton;
