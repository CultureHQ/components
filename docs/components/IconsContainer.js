import React from "react";

import { Icon } from "../../src";
import paths from "../../src/icons.json";

const IconsContainer = () => (
  <div className="icons">
    {Object.keys(paths).map(icon => (
      <span key={icon} title={icon}>
        <Icon icon={icon} />
      </span>
    ))}
  </div>
);

export default IconsContainer;
