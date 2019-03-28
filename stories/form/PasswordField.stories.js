import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { boolean, text } from "@storybook/addon-knobs";

import { PasswordField, Form, Panel } from "../../src/components";

storiesOf("Form/PasswordField", module)
  .add("default", () => {
    const children = text("children", "Password");
    const props = {
      autoFocus: boolean("autoFocus", false),
      onChange: action("onChange"),
      name: text("name", "password"),
      required: boolean("required", false),
      value: text("value", null)
    };

    return (
      <Panel>
        <Panel.Body>
          <Form>
            <PasswordField {...props}>{children}</PasswordField>
          </Form>
        </Panel.Body>
      </Panel>
    );
  })
  .add("autoFocus", () => (
    <Panel>
      <Panel.Body>
        <Form>
          <PasswordField name="password" autoFocus>Password</PasswordField>
        </Form>
      </Panel.Body>
    </Panel>
  ))
  .add("required", () => (
    <Panel>
      <Panel.Body>
        <Form>
          <PasswordField name="password" required>Password</PasswordField>
        </Form>
      </Panel.Body>
    </Panel>
  ))
  .add("validator", () => {
    const validator = value => {
      if (value.length >= 6) {
        return null;
      }
      return "Value must be at least 6 characters.";
    };

    return (
      <Panel>
        <Panel.Body>
          <Form>
            <PasswordField name="password" required validator={validator}>
              Password
            </PasswordField>
          </Form>
        </Panel.Body>
      </Panel>
    );
  });
