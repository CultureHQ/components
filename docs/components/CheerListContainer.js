import React, { useState } from "react";

import { CheerList } from "../../src";

const CheerListContainer = ({ cheers, name }) => {
  const [cheered, setCheered] = useState(false);

  const onCheerToggle = value => {
    setCheered(value);
    return new Promise(resolve => setTimeout(() => resolve(), 1000));
  };

  return (
    <CheerList
      cheered={cheered}
      cheers={cheers}
      name={name}
      onCheerToggle={onCheerToggle}
    />
  );
};

export default CheerListContainer;
