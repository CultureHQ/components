import React from "react";

import classnames from "../../classnames";

const PlainButton = React.forwardRef(({ children, className, ...props }, ref) => (
  <button {...props} ref={ref} type="button" className={classnames("chq-pbn", className)}>
    {children}
  </button>
));

PlainButton.displayName = "PlainButton";

export default PlainButton;
