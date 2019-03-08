import React from "react";

import classnames from "../classnames";

const getItemClassName = (className, sizeProps) => {
  let classList = classnames("chq-grid--item", className);

  ["xs", "sm", "md", "lg", "xl"].forEach(size => {
    if (sizeProps[size]) {
      classList = `${classList} chq-grid--${size}-${sizeProps[size]}`;
    } else if (sizeProps[size] === false) {
      classList = `${classList} chq-grid--${size}-hid`;
    }
  });

  return classList;
};

const Grid = ({ children, className }) => (
  <div className={classnames("chq-grid", className)}>
    {children}
  </div>
);

const GridItem = ({ children, className, ...sizeProps }) => (
  <div className={getItemClassName(className, sizeProps)}>
    {children}
  </div>
);

Grid.Item = GridItem;

export default Grid;
