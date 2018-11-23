import React from "react";

import Icon from "../Icon";
import Tooltip from "../Tooltip";
import paths from "../../icons.json";

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
