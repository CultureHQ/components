import React from "react";
import classnames from "classnames";

const FeedItem = ({ children, className }) => (
  <div className={classnames(className, "chq-fdi")}>
    {children}
  </div>
);

const FeedItemBody = ({ children, className }) => (
  <div className={classnames(className, "chq-fdi--bd")}>
    {children}
  </div>
);

const FeedItemFooter = ({ children, className }) => (
  <div className={classnames(className, "chq-fdi--ft")}>
    {children}
  </div>
);

Object.assign(FeedItem, {
  Body: FeedItemBody,
  Footer: FeedItemFooter
});

export default FeedItem;
