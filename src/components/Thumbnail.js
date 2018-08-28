import React from "react";

import classnames from "../classnames";

const Thumbnail = ({ className, image, size = "small", square = false, title }) => (
  <div
    className={
      classnames("chq-tmb", className, {
        "chq-tmb-md": size === "medium",
        "chq-tmb-lg": size === "large",
        "chq-tmb-sq": square
      })
    }
    style={{ backgroundImage: `url(${image})` }}
    title={title}
  />
);

export default Thumbnail;
