import * as React from "react";

import classnames from "../classnames";
import { HTMLContainerProps } from "../typings";

const FeedItem = ({ children, className }: HTMLContainerProps) => (
  <div className={classnames("chq-fdi", className)}>
    {children}
  </div>
);

const FeedItemBody = ({ children, className }: HTMLContainerProps) => (
  <div className={classnames("chq-fdi--bd", className)}>
    {children}
  </div>
);

const FeedItemFooter = ({ children, className }: HTMLContainerProps) => (
  <div className={classnames("chq-fdi--ft", className)}>
    {children}
  </div>
);

FeedItem.Body = FeedItemBody;
FeedItem.Footer = FeedItemFooter;

export default FeedItem;
