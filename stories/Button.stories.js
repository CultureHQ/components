import React from "react";
import { storiesOf } from "@storybook/react";

import { Button } from "../src/components";

storiesOf("Button", module)
  .add("default", () => <Button>Default</Button>)
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
