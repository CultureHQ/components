import React, { useState } from "react";
import { storiesOf } from "@storybook/react";
import { text } from "@storybook/addon-knobs";

import { Dropdown } from "../src/components";

storiesOf("Dropdown", module)
  .add("default", () => (
    <Dropdown>
      <Dropdown.Button>
        Segment By
      </Dropdown.Button>
      <Dropdown.ListBox>
        <Dropdown.Option>Departments</Dropdown.Option>
        <Dropdown.Option>Locations</Dropdown.Option>
        <Dropdown.Option>Interests</Dropdown.Option>
        <Dropdown.Option>Skills</Dropdown.Option>
      </Dropdown.ListBox>
    </Dropdown>
  ));
