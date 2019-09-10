import * as React from "react";

import classnames from "../../classnames";
import { OptionalContainerProps } from "../../typings";

type PlainButtonProps = OptionalContainerProps & React.HTMLAttributes<HTMLButtonElement>;

const PlainButton = React.forwardRef<HTMLButtonElement, PlainButtonProps>(
  ({ children, className, ...props }, ref) => (
    <button {...props} ref={ref} type="button" className={classnames("chq-pbn", className)}>
      {children}
    </button>
  )
);

PlainButton.displayName = "PlainButton";

export default PlainButton;
