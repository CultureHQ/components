import React from "react";

import classnames from "../../classnames";

const PlainButton = React.forwardRef(({ children, className, ...props }, ref) => (
  <button ref={ref} {...props} type="button" className={classnames("chq-pbn", className)}>
    {children}
  </button>
));

export default PlainButton;
