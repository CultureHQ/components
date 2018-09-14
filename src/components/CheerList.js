import React, { Component, Fragment } from "react";

import Cheer, { COLORS } from "./Cheer";
import CheerButton from "./CheerButton";

const colorKeys = Object.keys(COLORS);

class CheerList extends Component {
  render() {
    const { cheered, cheers, className, name, onCheerToggle } = this.props;

    return (
      <div className={className}>
        <CheerButton cheered={cheered} name={name} onCheerToggle={onCheerToggle} />
        {cheers.map(({ name }, index) => (
          <Cheer
            key={`${index}-${name}`}
            color={colorKeys[(cheered ? 1 : 0) + index % colorKeys.length]}
            name={name}
          />
        ))}
      </div>
    );
  }
}

export default CheerList;
