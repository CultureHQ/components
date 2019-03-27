import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, boolean, text } from "@storybook/addon-knobs";

import { Loader } from "../src/components";

storiesOf("Loader", module)
  .addDecorator(withKnobs)
  .add("default", () => {
    const children = text("children", "Default");
    const props = {
      loading: boolean("loading", true)
    };

    return <Loader {...props}>{children}</Loader>;
  });
