import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { withKnobs, boolean, optionsKnob, text } from "@storybook/addon-knobs";

import { Badge } from "../src/components";
import iconOptions from "./iconOptions";

storiesOf("Badge", module)
  .addDecorator(withKnobs)
  .add("default", () => {
    const children = text("children", "Default");
    const props = {
      icon: optionsKnob("icon", iconOptions, null, { display: "select" }),
      onClick: action("onClick"),
      primary: boolean("primary", false),
    };

    return <Badge {...props}>{children}</Badge>;
  })
  .add("primary", () => <Badge primary>Primary</Badge>)
  .add("icon", () => <Badge icon="clipboard">Icon</Badge>)
  .add("icon + primary", () => (
    <Badge icon="clipboard" primary>Primary Icon</Badge>
  ));
