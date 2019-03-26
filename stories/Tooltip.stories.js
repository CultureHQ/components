import React from "react";
import { storiesOf } from "@storybook/react";

import { Button, Tooltip } from "../src/components";

storiesOf("Tooltip", module)
  .add("default", () => (
    <Tooltip tip="This is a tooltip!">
      <Button primary disabled>Some action</Button>
    </Tooltip>
  ));
