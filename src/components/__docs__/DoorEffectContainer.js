import React, { useState } from "react";

import Button from "../buttons/Button";
import DoorEffect from "../DoorEffect";
import Panel from "../Panel";

const DoorEffectContainer = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <p>
        <Button onClick={() => setOpen(value => !value)}>Click me!</Button>
      </p>
      <DoorEffect className="door-effect" duration={300} open={open}>
        <Panel>
          <Panel.Body>This is open!</Panel.Body>
        </Panel>
      </DoorEffect>
    </>
  );
};

export default DoorEffectContainer;
