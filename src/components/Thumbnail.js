import React from "react";
import classnames from "classnames";

const Thumbnail = ({
  className, image, size = "small", square = false, ...props
}) => (
  <div
    className={
      classnames(className, "chq-tmb", {
        "chq-tmb-md": size === "medium",
        "chq-tmb-lg": size === "large",
        "chq-tmb-sq": square
      })
    }
    style={{ backgroundImage: `url(${image})` }}
    {...props}
  />
);

export default Thumbnail;
