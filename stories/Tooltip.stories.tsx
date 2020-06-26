import React from "react";
import { storiesOf } from "@storybook/react";
import { text } from "@storybook/addon-knobs";

import { Button, Tooltip, Icon } from "../src/components";

storiesOf("Tooltip", module)
  .add("default", () => {
    const tip = text("tip", "This is a tooltip!");

    return (
      <Tooltip tip={tip}>
        <Button primary disabled>Some action</Button>
      </Tooltip>
    );
  })
  .add("link", () => {
    const tip = text("tip", "This is a tooltip!");

    return (
      <Tooltip tip={tip}>
        <a href="/events/new/type" className="Button Button-inverted Button-primary">
          <Icon icon="calendar-add" />
        </a>
      </Tooltip>
    );
  });
