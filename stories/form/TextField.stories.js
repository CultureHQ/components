import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { boolean, text } from "@storybook/addon-knobs";

import { TextField, Form, Panel } from "../../src/components";

const Container = ({ children, ...props }) => (
  <Panel>
    <Panel.Body>
      <Form>
        <TextField {...props}>{children}</TextField>
      </Form>
    </Panel.Body>
  </Panel>
);

storiesOf("Form/TextField", module)
  .add("default", () => {
    const children = text("children", "Text");
    const props = {
      autoFocus: boolean("autoFocus", false),
      onChange: action("onChange"),
      name: text("name", "text"),
      required: boolean("required", false),
      value: text("value", undefined)
    };

    return <Container {...props}>{children}</Container>;
  })
  .add("autoFocus", () => <Container name="text" autoFocus>Text</Container>)
  .add("required", () => <Container name="text" required>Text</Container>)
  .add("validator", () => {
    const validator = value => {
      if (value.length >= 6) {
        return null;
      }
      return "Value must be at least 6 characters.";
    };

    return (
      <Container name="text" required validator={validator}>Text</Container>
    );
  });
