import React from "react";
import { storiesOf } from "@storybook/react";
import { text } from "@storybook/addon-knobs";

import { Warning } from "../src/components";

storiesOf("Warning", module)
  .add("default", () => {
    const children = text("children", "This is a warning");

    return <Warning>{children}</Warning>
  });
