import * as React from "react";

import classnames from "../classnames";

type TagProps = {
  children: React.ReactNode;
  className?: string;
  color?: "blue" | "gray" | "red";
};

const Tag: React.FC<TagProps> = ({ children, className, color = "blue" }) => (
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
