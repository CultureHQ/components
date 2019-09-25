import * as React from "react";

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

type GridProps = {
  children: React.ReactNode;
  className?: string;
};

const Grid = ({ children, className }: GridProps) => (
  <div className={classnames("chq-grid", className)}>
    {children}
  </div>
);

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

Grid.Item = GridItem;

export default Grid;
