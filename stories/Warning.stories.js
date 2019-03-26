import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, text } from "@storybook/addon-knobs";

import { Warning } from "../src/components";

storiesOf("Warning", module)
  .addDecorator(withKnobs)
  .add("default", () => {
    const children = text("children", "This is a warning");

    return <Warning>{children}</Warning>
  });
