import React from "react";
import { storiesOf } from "@storybook/react";
import { optionsKnob } from "@storybook/addon-knobs";

import { Icon } from "../src/components";
import iconOptions from "./utils/iconOptions";

storiesOf("Icon", module)
  .add("default", () => {
    const icon = optionsKnob("icon", iconOptions, null, { display: "select" });

    return <Icon icon={icon} />;
  });
