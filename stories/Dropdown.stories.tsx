import React, { useState } from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import { Dropdown } from "../src/components";

const actionOnChange = action("onChange");

const Container: React.FC = () => {
  const [value, setValue] = useState<string>("gryffindor");

  const onChange = (nextValue: string) => {
    actionOnChange(nextValue);
    setValue(nextValue);
  };

  return (
    <Dropdown selected={value} onChange={onChange}>
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
