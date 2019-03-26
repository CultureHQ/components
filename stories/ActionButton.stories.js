import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { withKnobs, boolean, optionsKnob, text } from "@storybook/addon-knobs";

import { ActionButton } from "../src/components";
import iconOptions from "./iconOptions";

storiesOf("ActionButton", module)
  .addDecorator(withKnobs)
  .add("default", () => {
    const children = text("children", "Default");
    const props = {
      icon: optionsKnob("icon", iconOptions, null, { display: "select" }),
      onClick: action("onClick"),
    };

    return <ActionButton {...props}>{children}</ActionButton>;
  })
  .add("icon", () => <ActionButton icon="clipboard">Icon</ActionButton>);
