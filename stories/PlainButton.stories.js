import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { withKnobs, text } from "@storybook/addon-knobs";

import { PlainButton } from "../src/components";

storiesOf("PlainButton", module)
  .addDecorator(withKnobs)
  .add("default", () => {
    const children = text("children", "Default");
    const props = {
      onClick: action("onClick")
    };

    return <PlainButton {...props}>{children}</PlainButton>;
  });
