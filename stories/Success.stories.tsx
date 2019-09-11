import * as React from "react";
import { storiesOf } from "@storybook/react";
import { text } from "@storybook/addon-knobs";

import { Success } from "../src/components";

storiesOf("Success", module)
  .add("default", () => {
    const children = text("children", "This is a success");

    return <Success>{children}</Success>;
  });
