import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { boolean, text } from "@storybook/addon-knobs";

import { Checkmark } from "../src/components";

storiesOf("Checkmark", module)
  .add("default", () => {
    const children = text("children", null);
    const props = {
      checked: boolean("checked", false),
      onClick: action("onClick")
    };

    return <Checkmark {...props}>{children}</Checkmark>
  })
  .add("checked", () => <Checkmark checked />);
