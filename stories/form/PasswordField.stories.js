import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { boolean, text } from "@storybook/addon-knobs";

import { PasswordField, Form, Panel } from "../../src/components";

const Container = ({ children, ...props }) => (
  <Panel>
    <Panel.Body>
      <Form>
        <PasswordField {...props}>{children}</PasswordField>
      </Form>
    </Panel.Body>
  </Panel>
);

storiesOf("Form/PasswordField", module)
  .add("default", () => {
    const children = text("children", "Password");
    const props = {
      autoFocus: boolean("autoFocus", false),
      onChange: action("onChange"),
      name: text("name", "password"),
      required: boolean("required", false),
      value: text("value", undefined)
    };

    return <Container {...props}>{children}</Container>;
  })
  .add("autoFocus", () => (
    <Container name="password" autoFocus>Password</Container>
  ))
  .add("required", () => (
    <Container name="password" required>Password</Container>
  ))
  .add("validator", () => {
    const validator = value => {
      if (value.length >= 6) {
        return null;
      }
      return "Value must be at least 6 characters.";
    };

    return (
      <Container name="password" required validator={validator}>
        Password
      </Container>
    );
  });
