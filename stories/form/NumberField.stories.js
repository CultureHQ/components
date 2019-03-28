import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { boolean, text } from "@storybook/addon-knobs";

import { NumberField, Form, Panel } from "../../src/components";

const Container = ({ children, ...props }) => (
  <Panel>
    <Panel.Body>
      <Form>
        <NumberField {...props}>{children}</NumberField>
      </Form>
    </Panel.Body>
  </Panel>
);

storiesOf("Form/NumberField", module)
  .add("default", () => {
    const children = text("children", "Number");
    const props = {
      autoFocus: boolean("autoFocus", false),
      onChange: action("onChange"),
      name: text("name", "number"),
      required: boolean("required", false),
      value: text("value", undefined)
    };

    return <Container {...props}>{children}</Container>;
  })
  .add("autoFocus", () => <Container name="number" autoFocus>Number</Container>)
  .add("required", () => <Container name="number" required>Number</Container>)
  .add("validator", () => {
    const validator = value => {
      if (value >= 1 && value <= 10) {
        return null;
      }
      return "Value must be between 1 and 10.";
    };

    return (
      <Container name="number" required validator={validator}>Number</Container>
    );
  });
