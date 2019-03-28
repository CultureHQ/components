import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { boolean, number, text } from "@storybook/addon-knobs";

import { CentsField, Form, Panel } from "../../src/components";

const Container = ({ children, ...props }) => (
  <Panel>
    <Panel.Body>
      <Form>
        <CentsField {...props}>{children}</CentsField>
      </Form>
    </Panel.Body>
  </Panel>
);

storiesOf("Form/CentsField", module)
  .add("default", () => {
    const children = text("children", "Cents");
    const props = {
      autoFocus: boolean("autoFocus", false),
      onChange: action("onChange"),
      name: text("name", "cents"),
      required: boolean("required", false),
      value: number("value", null)
    };

    return <Container {...props}>{children}</Container>;
  })
  .add("autoFocus", () => <Container name="cents" autoFocus>Cents</Container>)
  .add("required", () => <Container name="cents" required>Cents</Container>);
