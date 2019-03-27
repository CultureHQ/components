import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { withKnobs, boolean, optionsKnob, text } from "@storybook/addon-knobs";

import { Cheer } from "../src/components";

const colorOptions = {
  darkblue: "darkblue",
  green: "green",
  lightblue: "lightblue",
  yellow: "yellow"
};

storiesOf("Cheer", module)
  .addDecorator(withKnobs)
  .add("default", () => {
    const props = {
      color: optionsKnob("color", colorOptions, "darkblue", { display: "inline-radio" }),
      name: text("name", null),
      pop: boolean("pop", false),
      small: boolean("small", false)
    };

    return <Cheer {...props} />;
  })
  .add("name", () => <Cheer name="Harry Potter" />)
  .add("pop", () => <Cheer pop />)
  .add("small", () => <Cheer small />)
  .add("pop + small", () => <Cheer pop small />);
