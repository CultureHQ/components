import React from "react";

import Cheer, { COLORS } from "./Cheer";
import CheerButton from "./buttons/CheerButton";

const colorKeys = Object.keys(COLORS);

const CheerList = ({ cheered, cheers, name, onCheerToggle }) => (
  <>
    <CheerButton cheered={cheered} name={name} onCheerToggle={onCheerToggle} />
    {cheers.map(({ name: cheerName }, index) => (
      <Cheer
        key={`${index}-${name}`} // eslint-disable-line
        color={colorKeys[((cheered ? 1 : 0) + index) % colorKeys.length]}
        name={cheerName}
      />
    ))}
  </>
);

export default CheerList;
