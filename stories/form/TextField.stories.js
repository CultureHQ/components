import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { boolean, text } from "@storybook/addon-knobs";

import { TextField, Form, Panel } from "../../src/components";

storiesOf("Form/TextField", module)
  .add("default", () => {
    const children = text("children", "Text");
    const props = {
      autoFocus: boolean("autoFocus", false),
      onChange: action("onChange"),
      name: text("name", "text"),
      required: boolean("required", false),
      value: text("value", null)
    };

    return (
      <Panel>
        <Panel.Body>
          <Form>
            <TextField {...props}>{children}</TextField>
          </Form>
        </Panel.Body>
      </Panel>
    );
  })
  .add("autoFocus", () => (
    <Panel>
      <Panel.Body>
        <Form>
          <TextField name="text" autoFocus>Text</TextField>
        </Form>
      </Panel.Body>
    </Panel>
  ))
  .add("required", () => (
    <Panel>
      <Panel.Body>
        <Form>
          <TextField name="text" required>Text</TextField>
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
            <TextField name="text" required validator={validator}>
              Text
            </TextField>
          </Form>
        </Panel.Body>
      </Panel>
    );
  });
