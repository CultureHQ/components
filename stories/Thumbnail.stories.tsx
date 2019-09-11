import * as React from "react";
import { storiesOf } from "@storybook/react";
import { boolean, optionsKnob, text } from "@storybook/addon-knobs";

import { Thumbnail } from "../src/components";

const image = require("./public/culture.png");

const sizeOptions = {
  small: "small",
  medium: "medium",
  large: "large"
} as const;

const asOptions = {
  div: "div",
  span: "span"
} as const;

storiesOf("Thumbnail", module)
  .add("default", () => {
    const props = {
      image,
      as: optionsKnob("as", asOptions, "div", {
        display: "inline-radio"
      }),
      size: optionsKnob("size", sizeOptions, "small", {
        display: "inline-radio"
      }),
      square: boolean("square", false),
      title: text("title", null)
    };

    return <Thumbnail {...props} />;
  });
