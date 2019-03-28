import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { boolean, text } from "@storybook/addon-knobs";

import { StringField, Form, Panel } from "../../src/components";

const Container = ({ children, ...props }) => (
  <Panel>
    <Panel.Body>
      <Form>
        <StringField {...props}>{children}</StringField>
      </Form>
    </Panel.Body>
  </Panel>
);

storiesOf("Form/StringField", module)
  .add("default", () => {
    const children = text("children", "String");
    const props = {
      autoFocus: boolean("autoFocus", false),
      onChange: action("onChange"),
      name: text("name", "string"),
      required: boolean("required", false),
      value: text("value", undefined)
    };

    return <Container {...props}>{children}</Container>;
  })
  .add("autoFocus", () => <Container name="string" autoFocus>String</Container>)
  .add("required", () => <Container name="string" required>String</Container>)
  .add("validator", () => {
    const validator = value => {
      if (value.length >= 6) {
        return null;
      }
      return "Value must be at least 6 characters.";
    };

    return (
      <Container name="string" required validator={validator}>String</Container>
    );
  });
