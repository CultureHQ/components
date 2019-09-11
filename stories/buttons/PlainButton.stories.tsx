import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { text } from "@storybook/addon-knobs";

import { PlainButton } from "../../src/components";

storiesOf("Buttons/PlainButton", module)
  .add("default", () => {
    const children = text("children", "Default");
    const props = {
      onClick: action("onClick")
    };

    return <PlainButton {...props}>{children}</PlainButton>;
  });
