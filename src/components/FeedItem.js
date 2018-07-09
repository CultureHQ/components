import React from "react";
import classnames from "classnames";

const FeedItem = ({ children, className, ...props }) => (
  <div className={classnames(className, "chq-fdi")} {...props}>
    {children}
  </div>
);

FeedItem.Body = ({ children, className, ...props }) => (
  <div className={classnames(className, "chq-fdi--bd")} {...props}>
    {children}
  </div>
);

FeedItem.Footer = ({ children, className, ...props }) => (
  <div className={classnames(className, "chq-fdi--ft")} {...props}>
    {children}
  </div>
);

export default FeedItem;
