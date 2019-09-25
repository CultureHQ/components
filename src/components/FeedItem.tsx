import * as React from "react";

import classnames from "../classnames";

type FeedItemProps = {
  children?: React.ReactNode;
  className?: string;
};

const FeedItem = ({ children, className }: FeedItemProps) => (
  <div className={classnames("chq-fdi", className)}>
    {children}
  </div>
);

const FeedItemBody: React.FC<FeedItemProps> = ({ children, className }) => (
  <div className={classnames("chq-fdi--bd", className)}>
    {children}
  </div>
);

const FeedItemFooter: React.FC<FeedItemProps> = ({ children, className }) => (
  <div className={classnames("chq-fdi--ft", className)}>
    {children}
  </div>
);

FeedItem.Body = FeedItemBody;
FeedItem.Footer = FeedItemFooter;

export default FeedItem;
