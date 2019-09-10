import * as React from "react";

import classnames from "../classnames";
import { ContainerProps } from "../typings";

const FeedItem = ({ children, className }: ContainerProps) => (
  <div className={classnames("chq-fdi", className)}>
    {children}
  </div>
);

const FeedItemBody = ({ children, className }: ContainerProps) => (
  <div className={classnames("chq-fdi--bd", className)}>
    {children}
  </div>
);

const FeedItemFooter = ({ children, className }: ContainerProps) => (
  <div className={classnames("chq-fdi--ft", className)}>
    {children}
  </div>
);

FeedItem.Body = FeedItemBody;
FeedItem.Footer = FeedItemFooter;

export default FeedItem;
