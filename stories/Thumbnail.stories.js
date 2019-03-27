import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, boolean, optionsKnob, text } from "@storybook/addon-knobs";

import { Thumbnail } from "../src/components";
import image from "./utils/culture.png";

const sizeOptions = {
  small: "small",
  medium: "medium",
  large: "large"
};

storiesOf("Thumbnail", module)
  .addDecorator(withKnobs)
  .add("default", () => {
    const props = {
      image,
      size: optionsKnob("size", sizeOptions, "small", {
        display: "inline-radio"
      }),
      square: boolean("square", false),
      title: text("title", null)
    };

    return <Thumbnail {...props} />;
  });
