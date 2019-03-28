import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { boolean, text } from "@storybook/addon-knobs";

import { StringField, Form, Panel } from "../../src/components";

storiesOf("Form/StringField", module)
  .add("default", () => {
    const children = text("children", "String");
    const props = {
      autoFocus: boolean("autoFocus", false),
      onChange: action("onChange"),
      name: text("name", "string"),
      required: boolean("required", false),
      value: text("value", null)
    };

    return (
      <Panel>
        <Panel.Body>
          <Form>
            <StringField {...props}>{children}</StringField>
          </Form>
        </Panel.Body>
      </Panel>
    );
  })
  .add("autoFocus", () => (
    <Panel>
      <Panel.Body>
        <Form>
          <StringField name="string" autoFocus>String</StringField>
        </Form>
      </Panel.Body>
    </Panel>
  ))
  .add("required", () => (
    <Panel>
      <Panel.Body>
        <Form>
          <StringField name="string" required>String</StringField>
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
            <StringField name="string" required validator={validator}>
              String
            </StringField>
          </Form>
        </Panel.Body>
      </Panel>
    );
  });
