import * as React from "react";

import classnames from "../classnames";
import { ContainerProps } from "../typings";

type TagProps = ContainerProps & {
  color?: "blue" | "gray" | "red";
};

const Tag = ({ children, className, color = "blue" }: TagProps) => (
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
