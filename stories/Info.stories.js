import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, text } from "@storybook/addon-knobs";

import { Info } from "../src/components";

storiesOf("Info", module)
  .addDecorator(withKnobs)
  .add("default", () => {
    const children = text("children", "This is an info");

    return <Info>{children}</Info>
  });
