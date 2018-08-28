import React from "react";

import classnames from "../classnames";

const FeedItem = ({ children, className }) => (
  <div className={classnames("chq-fdi", className)}>
    {children}
  </div>
);

const FeedItemBody = ({ children, className }) => (
  <div className={classnames("chq-fdi--bd", className)}>
    {children}
  </div>
);

const FeedItemFooter = ({ children, className }) => (
  <div className={classnames("chq-fdi--ft", className)}>
    {children}
  </div>
);

Object.assign(FeedItem, {
  Body: FeedItemBody,
  Footer: FeedItemFooter
});

export default FeedItem;
