import React from "react";
import { storiesOf } from "@storybook/react";
import { text } from "@storybook/addon-knobs";

import { Info } from "../src/components";

storiesOf("Info", module)
  .add("default", () => {
    const children = text("children", "This is an info");

    return <Info>{children}</Info>
  });
