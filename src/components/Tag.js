import React from "react";
import classnames from "classnames";

const Tag = ({ children, className, color = "blue" }) => (
  <div
    className={
      classnames("chq-tag", className, {
        "chq-tag-gy": color === "gray",
        "chq-tag-rd": color === "red"
      })
    }
  >
    {children}
  </div>
);

export default Tag;
