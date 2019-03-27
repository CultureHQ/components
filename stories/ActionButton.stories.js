import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { boolean, optionsKnob, text } from "@storybook/addon-knobs";

import { ActionButton } from "../src/components";
import iconOptions from "./utils/iconOptions";

storiesOf("ActionButton", module)
  .add("default", () => {
    const children = text("children", "Default");
    const props = {
      icon: optionsKnob("icon", iconOptions, null, { display: "select" }),
      onClick: action("onClick"),
    };

    return <ActionButton {...props}>{children}</ActionButton>;
  })
  .add("icon", () => <ActionButton icon="clipboard">Icon</ActionButton>);
