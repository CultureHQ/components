import * as React from "react";

import classnames from "../../classnames";
import Cheer from "../Cheer";

type CheerButtonProps = {
  cheered?: boolean;
  className?: string;
  name?: string;
  onCheerToggle: (cheered: boolean) => Promise<any>;
  small?: boolean;
};

const CheerButton = ({
  cheered = false,
  className,
  name,
  onCheerToggle,
  small = false
}: CheerButtonProps) => {
  const [toggling, setToggling] = React.useState<boolean>(false);
  const [touched, setTouched] = React.useState<boolean>(false);

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
