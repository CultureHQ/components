import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { number } from "@storybook/addon-knobs";

import { Subnav } from "../src/components";

storiesOf("Subnav", module)
  .add("default", () => {
    const props = {
      activeIndex: number("activeIndex", 0),
      onChange: action("onChange")
    };

    return (
      <Subnav {...props}>
        <Subnav.Item>One</Subnav.Item>
        <Subnav.Item>Two</Subnav.Item>
        <Subnav.Item>Three</Subnav.Item>
      </Subnav>
    );
  });
