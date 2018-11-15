import React from "react";

import { Icon, Tooltip } from "../../src";
import paths from "../../src/icons.json";

const IconsContainer = () => (
  <div className="icons">
    {Object.keys(paths).map(icon => (
      <Tooltip key={icon} tip={icon}>
        <Icon icon={icon} />
      </Tooltip>
    ))}
  </div>
);

export default IconsContainer;
