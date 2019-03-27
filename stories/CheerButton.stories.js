import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { withKnobs, boolean, text } from "@storybook/addon-knobs";

import { CheerButton } from "../src/components";

storiesOf("CheerButton", module)
  .addDecorator(withKnobs)
  .add("default", () => {
    const props = {
      cheered: boolean("cheered", false),
      name: text("name", null),
      onCheerToggle: action("onCheerToggle"),
      small: boolean("small", false)
    };

    return <CheerButton {...props} />;
  })
  .add("cheered", () => <CheerButton cheered />)
  .add("name", () => <CheerButton name="Harry Potter" />)
  .add("small", () => <CheerButton small />)
  .add("cheered + small", () => <CheerButton cheered small />);
