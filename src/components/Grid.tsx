import * as React from "react";

import classnames from "../classnames";
import { ContainerProps, OptionalContainerProps } from "../typings";

type Size = "xs" | "sm" | "md" | "lg" | "xl";
const sizes: Size[] = ["xs", "sm", "md", "lg", "xl"];

type SizeProps = Partial<Record<Size, number | false>>;

const getItemClassName = (className: undefined | string, sizeProps: SizeProps) => {
  let classList = classnames("chq-grid--item", className);

  sizes.forEach(size => {
    if (sizeProps[size]) {
      classList = `${classList} chq-grid--${size}-${sizeProps[size]}`;
    } else if (sizeProps[size] === false) {
      classList = `${classList} chq-grid--${size}-hid`;
    }
  });

  return classList;
};

const Grid = ({ children, className }: ContainerProps) => (
  <div className={classnames("chq-grid", className)}>
    {children}
  </div>
);

type GridItemProps = OptionalContainerProps & SizeProps;

// Inner div necessary per https://github.com/philipwalton/flexbugs#flexbug-7
const GridItem = ({ children, className, ...sizeProps }: GridItemProps) => (
  <div className={getItemClassName(className, sizeProps)}>
    <div className="chq-grid--item--inner">
      {children}
    </div>
  </div>
);

Grid.Item = GridItem;

export default Grid;
