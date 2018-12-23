import React from "react";

import classnames from "../classnames";

const Grid = ({ children }) => (
  <div className="chq-grid">
    {children}
  </div>
);

const GridItem = ({ children, className, ...props }) => {
  let classList = classnames("chq-grid--item", className);

  ["xs", "sm", "md", "lg", "xl"].forEach(size => {
    if (props[size]) {
      classList = `${classList} chq-grid--${size}-${props[size]}`;
    }
  });

  return (
    <div className={classList}>
      {children}
    </div>
  );
};

Grid.Item = GridItem;

export default Grid;
