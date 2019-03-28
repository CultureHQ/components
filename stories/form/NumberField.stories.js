import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { boolean, text } from "@storybook/addon-knobs";

import { NumberField, Form, Panel } from "../../src/components";

storiesOf("Form/NumberField", module)
  .add("default", () => {
    const children = text("children", "Number");
    const props = {
      autoFocus: boolean("autoFocus", false),
      onChange: action("onChange"),
      name: text("name", "number"),
      required: boolean("required", false),
      value: text("value", null)
    };

    return (
      <Panel>
        <Panel.Body>
          <Form>
            <NumberField {...props}>{children}</NumberField>
          </Form>
        </Panel.Body>
      </Panel>
    );
  })
  .add("autoFocus", () => (
    <Panel>
      <Panel.Body>
        <Form>
          <NumberField name="number" autoFocus>Number</NumberField>
        </Form>
      </Panel.Body>
    </Panel>
  ))
  .add("required", () => (
    <Panel>
      <Panel.Body>
        <Form>
          <NumberField name="number" required>Number</NumberField>
        </Form>
      </Panel.Body>
    </Panel>
  ))
  .add("validator", () => {
    const validator = value => {
      if (value >= 1 && value <= 10) {
        return null;
      }
      return "Value must be between 1 and 10.";
    };

    return (
      <Panel>
        <Panel.Body>
          <Form>
            <NumberField name="email" required validator={validator}>
              Number
            </NumberField>
          </Form>
        </Panel.Body>
      </Panel>
    );
  });
