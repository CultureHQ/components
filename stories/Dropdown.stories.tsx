import React, { useState } from "react";
import { storiesOf } from "@storybook/react";
import { text } from "@storybook/addon-knobs";

import { Dropdown } from "../src/components";

const Container: React.FC = () => {
  const [value, setValue] = useState<string>("gryffindor");

  return (
    <Dropdown selected={value} onChange={setValue}>
      <Dropdown.Button>
        House
      </Dropdown.Button>
      <Dropdown.ListBox>
        <Dropdown.Option value="gryffindor">Gryffindor</Dropdown.Option>
        <Dropdown.Option value="hufflepuff">Hufflepuff</Dropdown.Option>
        <Dropdown.Option value="ravenclaw">Ravenclaw</Dropdown.Option>
        <Dropdown.Option value="slytherin">Slytherin</Dropdown.Option>
      </Dropdown.ListBox>
    </Dropdown>
  );
};

storiesOf("Dropdown", module)
  .add("default", () => <Container />);
