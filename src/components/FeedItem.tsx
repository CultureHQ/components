import * as React from "react";

import classnames from "../classnames";
import { OptionalContainerProps } from "../typings";

const FeedItem = ({ children, className }: OptionalContainerProps) => (
  <div className={classnames("chq-fdi", className)}>
    {children}
  </div>
);

const FeedItemBody = ({ children, className }: OptionalContainerProps) => (
  <div className={classnames("chq-fdi--bd", className)}>
    {children}
  </div>
);

const FeedItemFooter = ({ children, className }: OptionalContainerProps) => (
  <div className={classnames("chq-fdi--ft", className)}>
    {children}
  </div>
);

FeedItem.Body = FeedItemBody;
FeedItem.Footer = FeedItemFooter;

export default FeedItem;
