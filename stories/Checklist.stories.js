import React from "react";
import { storiesOf } from "@storybook/react";
import { boolean } from "@storybook/addon-knobs";

import { Checklist } from "../src/components";

storiesOf("Checklist", module)
  .add("default", () => {
    const checked = {
      first: boolean("first", true),
      second: boolean("second", false)
    };

    return (
      <Checklist>
        <Checklist.Item checked={checked.first}>First</Checklist.Item>
        <Checklist.Item checked={checked.second}>Second</Checklist.Item>
      </Checklist>
    );
  });
