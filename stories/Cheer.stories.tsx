import * as React from "react";
import { storiesOf } from "@storybook/react";
import { boolean, optionsKnob, text } from "@storybook/addon-knobs";

import { Cheer } from "../src/components";

const colorOptions = {
  darkblue: "darkblue",
  green: "green",
  lightblue: "lightblue",
  yellow: "yellow"
};

storiesOf("Cheer", module)
  .add("default", () => {
    const props = {
      color: optionsKnob("color", colorOptions, "darkblue", {
        display: "inline-radio"
      }) as React.ComponentProps<typeof Cheer>["color"],
      name: text("name", ""),
      pop: boolean("pop", false),
      small: boolean("small", false)
    };

    return <Cheer {...props} />;
  })
  .add("name", () => <Cheer name="Harry Potter" />)
  .add("pop", () => <Cheer pop />)
  .add("small", () => <Cheer small />)
  .add("pop + small", () => <Cheer pop small />);
