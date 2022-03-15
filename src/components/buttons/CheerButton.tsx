import React, { useState } from "react";

import classnames from "../../classnames";
import Cheer from "../Cheer";

type CheerButtonProps = {
  cheered?: boolean;
  className?: string;
  name?: string;
  onCheerToggle: (cheered: boolean) => Promise<any>;
  small?: boolean;
};

const CheerButton: React.FC<CheerButtonProps> = ({
  cheered = false,
  className,
  name,
  onCheerToggle,
  small = false
}) => {
  const [toggling, setToggling] = useState<boolean>(false);
  const [touched, setTouched] = useState<boolean>(false);

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

CheerButton.defaultProps = {
  cheered: undefined,
  className: undefined,
  name: undefined,
  small: undefined
};

export default CheerButton;
