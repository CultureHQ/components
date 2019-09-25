import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { boolean, text } from "@storybook/addon-knobs";

import { CheerButton } from "../../src/components";

const dummyCheerToggle = () => Promise.resolve();

storiesOf("Buttons/CheerButton", module)
  .add("default", () => {
    const onCheerToggle = action("onCheerToggle");

    const props = {
      cheered: boolean("cheered", false),
      name: text("name", ""),
      onCheerToggle: (cheered: boolean) => {
        onCheerToggle(cheered);
        return new Promise(resolve => setTimeout(resolve, 1000));
      },
      small: boolean("small", false)
    };

    return <CheerButton {...props} />;
  })
  .add("cheered", () => (
    <CheerButton cheered onCheerToggle={dummyCheerToggle} />
  ))
  .add("name", () => (
    <CheerButton name="Harry Potter" onCheerToggle={dummyCheerToggle} />
  ))
  .add("small", () => (
    <CheerButton small onCheerToggle={dummyCheerToggle} />
  ))
  .add("cheered + small", () => (
    <CheerButton cheered small onCheerToggle={dummyCheerToggle} />
  ));
