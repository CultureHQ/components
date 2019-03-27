import React, { useState } from "react";
import { storiesOf } from "@storybook/react";
import { boolean, number } from "@storybook/addon-knobs";

import { Button, DoorEffect, Panel } from "../src/components";

const Container = () => {
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

storiesOf("DoorEffect", module).add("default", () => <Container />);
