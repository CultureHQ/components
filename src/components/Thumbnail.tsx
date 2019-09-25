import * as React from "react";

import classnames from "../classnames";

type ThumbnailProps = {
  as?: keyof React.ReactHTML | React.ComponentType;
  className?: string;
  image: string;
  size?: "small" | "medium" | "large";
  square?: boolean;
  title?: string;
};

const Thumbnail: React.FC<ThumbnailProps> = ({
  as: Element = "div",
  className,
  image,
  size = "small",
  square = false,
  title
}) => (
  <Element
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
