import React from "react";
import { storiesOf } from "@storybook/react";

import { Info } from "../src/components";

storiesOf("Info", module)
  .add("default", () => <Info>This is an info</Info>);
