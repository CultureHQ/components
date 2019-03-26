import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { withKnobs, boolean, optionsKnob, text } from "@storybook/addon-knobs";

import { Button } from "../src/components";
import icons from "../src/icons.json";

const iconOpts = Object.keys(icons).reduce(
  (accum, icon) => ({ ...accum, [icon]: icon }), { none: null }
);

storiesOf("Button", module)
  .addDecorator(withKnobs)
  .add("default", () => {
    const children = text("children", "Default");
    const props = {
      danger: boolean("danger", false),
      disabled: boolean("disabled", false),
      fillParent: boolean("fillParent", false),
      icon: optionsKnob("icon", iconOpts, null, { display: "select" }),
      inverted: boolean("inverted", false),
      loading: boolean("loading", false),
      onClick: action("onClick"),
      primary: boolean("primary", false),
      small: boolean("small", false)
    };

    return <Button {...props}>{children}</Button>;
  })
  .add("loading", () => <Button loading>Loading</Button>)
  .add("disabled", () => <Button disabled>Disabled</Button>)
  .add("danger", () => <Button danger>Danger</Button>)
  .add("primary", () => <Button primary>Primary</Button>)
  .add("small ", () => <Button small>Small</Button>)
  .add("inverted", () => <Button inverted>Inverted</Button>)
  .add("icon", () => <Button icon="clipboard">Icon</Button>)
  .add("icon + primary", () => <Button icon="clipboard" primary>Primary Icon</Button>)
  .add("icon + small", () => <Button icon="clipboard" small>Small Icon</Button>)
  .add("icon + inverted", () => <Button icon="clipboard" inverted>Inverted Icon</Button>);
