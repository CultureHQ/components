import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { boolean, number, text } from "@storybook/addon-knobs";

import { CentsField, Form, Panel } from "../../src/components";

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

    return (
      <Panel>
        <Panel.Body>
          <Form>
            <CentsField {...props}>{children}</CentsField>
          </Form>
        </Panel.Body>
      </Panel>
    );
  })
  .add("autoFocus", () => (
    <Panel>
      <Panel.Body>
        <Form>
          <CentsField name="cents" autoFocus>Cents</CentsField>
        </Form>
      </Panel.Body>
    </Panel>
  ))
  .add("required", () => (
    <Panel>
      <Panel.Body>
        <Form>
          <CentsField name="cents" required>Cents</CentsField>
        </Form>
      </Panel.Body>
    </Panel>
  ));
