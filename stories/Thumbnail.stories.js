import React from "react";
import { storiesOf } from "@storybook/react";
import { boolean, optionsKnob, text } from "@storybook/addon-knobs";

import { Thumbnail } from "../src/components";
import image from "./public/culture.png";

const sizeOptions = {
  small: "small",
  medium: "medium",
  large: "large"
};

const asOptions = {
  div: "div",
  span: "span"
};

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
