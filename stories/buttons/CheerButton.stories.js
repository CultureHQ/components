import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { boolean, text } from "@storybook/addon-knobs";

import { CheerButton } from "../../src/components";

storiesOf("Buttons/CheerButton", module)
  .add("default", () => {
    const onCheerToggle = action("onCheerToggle");

    const props = {
      cheered: boolean("cheered", false),
      name: text("name", null),
      onCheerToggle: (...args) => {
        onCheerToggle(...args);
        return new Promise(resolve => setTimeout(resolve, 1000));
      },
      small: boolean("small", false)
    };

    return <CheerButton {...props} />;
  })
  .add("cheered", () => <CheerButton cheered />)
  .add("name", () => <CheerButton name="Harry Potter" />)
  .add("small", () => <CheerButton small />)
  .add("cheered + small", () => <CheerButton cheered small />);
