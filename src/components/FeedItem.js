import React from "react";
import classnames from "classnames";

const FeedItem = ({ children, className }) => (
  <div className={classnames(className, "chq-fdi")}>
    {children}
  </div>
);

FeedItem.Body = ({ children, className }) => (
  <div className={classnames(className, "chq-fdi--bd")}>
    {children}
  </div>
);

FeedItem.Footer = ({ children, className }) => (
  <div className={classnames(className, "chq-fdi--ft")}>
    {children}
  </div>
);

export default FeedItem;
