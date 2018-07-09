import React from "react";
import classnames from "classnames";

const Tag = ({ children, className, color = "blue", ...props }) => (
  <div
    className={
      classnames(
        className,
        "chq-tag",
        { "chq-tag-gy": color === "gray" },
        { "chq-tag-rd": color === "red" }
      )
    }
    {...props}
  >
    {children}
  </div>
);

export default Tag;
