import React from "react";
import { storiesOf } from "@storybook/react";

import { Warning } from "../src/components";

storiesOf("Warning", module)
  .add("default", () => <Warning>This is a warning</Warning>);
