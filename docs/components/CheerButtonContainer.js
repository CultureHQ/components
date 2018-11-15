import React, { useCallback, useState } from "react";

import { CheerButton } from "../../src";

const CheerButtonContainer = ({ cheered: initialCheered, name, small }) => {
  const [cheered, setCheered] = useState(initialCheered);

  const onCheerToggle = useCallback(value => {
    setCheered(value);
    return new Promise(resolve => setTimeout(() => resolve(), 500));
  });

  return (
    <CheerButton
      cheered={cheered}
      name={name}
      small={small}
      onCheerToggle={onCheerToggle}
    />
  );
};

export default CheerButtonContainer;
