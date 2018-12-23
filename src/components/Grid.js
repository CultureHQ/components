import React from "react";

import classnames from "../classnames";

const getGridStyles = spacing => (
  spacing ? { margin: `-${spacing / 2}px` } : null
);

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

const getItemStyles = spacing => (
  spacing ? { padding: `${spacing / 2}px` } : null
);

const Grid = ({ children, className, spacing }) => (
  <div className={classnames("chq-grid", className)} style={getGridStyles(spacing)}>
    {React.Children.map(children, child => (
      React.cloneElement(child, { spacing })
    ))}
  </div>
);

const GridItem = ({ children, className, spacing, ...sizeProps }) => (
  <div className={getItemClassName(className, sizeProps)} style={getItemStyles(spacing)}>
    {children}
  </div>
);

Grid.Item = GridItem;

export default Grid;
