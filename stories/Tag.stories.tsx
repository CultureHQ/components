import React from "react";
import { storiesOf } from "@storybook/react";
import { optionsKnob, text } from "@storybook/addon-knobs";

import { Tag } from "../src/components";

const colorOptions = {
  blue: "blue",
  gray: "gray",
  red: "red"
} as const;

storiesOf("Tag", module)
  .add("default", () => {
    const children = text("children", "Tag");
    const props = {
      color: optionsKnob("color", colorOptions, "blue", {
        display: "inline-radio"
      })
    };

    return <Tag {...props}>{children}</Tag>;
  });
