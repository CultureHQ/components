import React, { useState } from "react";

import classnames from "../../classnames";
import Cheer from "../Cheer";

const CheerButton = ({ cheered, className, name, onCheerToggle, small }) => {
  const [toggling, setToggling] = useState(false);
  const [touched, setTouched] = useState(false);

  const onClick = () => {
    setToggling(true);
    setTouched(true);
    onCheerToggle(!cheered).then(() => setToggling(false));
  };

  return (
    <>
      <button
        type="button"
        className={
          classnames("chq-cbn", className, {
            "chq-cbn-ch": cheered,
            "chq-cbn-sm": small
          })
        }
        disabled={toggling}
        onClick={onClick}
      >
        <Cheer />
        {!small && <>{" "}Cheer!</>}
      </button>
      {cheered && <Cheer name={name} small={small} pop={touched} />}
    </>
  );
};

export default CheerButton;
