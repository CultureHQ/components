import React from "react";

import classnames from "../classnames";

export type GridSize = "xs" | "sm" | "md" | "lg" | "xl";
const sizes: GridSize[] = ["xs", "sm", "md", "lg", "xl"];

type GridSizeProps = Partial<Record<GridSize, number | false>>;

const getItemClassName = (className: undefined | string, sizeProps: GridSizeProps) => {
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

type GridItemProps = GridSizeProps & {
  children?: React.ReactNode;
  className?: string;
};

// Inner div necessary per https://github.com/philipwalton/flexbugs#flexbug-7
const GridItem: React.FC<GridItemProps> = ({ children, className, ...sizeProps }) => (
  <div className={getItemClassName(className, sizeProps)}>
    <div className="chq-grid--item--inner">
      {children}
    </div>
  </div>
);

type GridProps = {
  children: React.ReactNode;
  className?: string;
};

type GridComponent = React.FC<GridProps> & {
  Item: typeof GridItem;
};

const Grid: GridComponent = ({ children, className }) => (
  <div className={classnames("chq-grid", className)}>
    {children}
  </div>
);

Grid.Item = GridItem;

export default Grid;
