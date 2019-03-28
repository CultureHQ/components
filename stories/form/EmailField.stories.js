import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { boolean, text } from "@storybook/addon-knobs";

import { EmailField, Form, Panel } from "../../src/components";

storiesOf("Form/EmailField", module)
  .add("default", () => {
    const children = text("children", "Email");
    const props = {
      autoFocus: boolean("autoFocus", false),
      onChange: action("onChange"),
      name: text("name", "cents"),
      required: boolean("required", false),
      value: text("value", null)
    };

    return (
      <Panel>
        <Panel.Body>
          <Form>
            <EmailField {...props}>{children}</EmailField>
          </Form>
        </Panel.Body>
      </Panel>
    );
  })
  .add("autoFocus", () => (
    <Panel>
      <Panel.Body>
        <Form>
          <EmailField name="email" autoFocus>Email</EmailField>
        </Form>
      </Panel.Body>
    </Panel>
  ))
  .add("required", () => (
    <Panel>
      <Panel.Body>
        <Form>
          <EmailField name="email" required>Email</EmailField>
        </Form>
      </Panel.Body>
    </Panel>
  ))
  .add("validator", () => {
    const validator = value => {
      if (value.match(/^[a\.@]+$/)) {
        return null;
      }
      return "Value can only include `a`s, `.`s, and `@`s.";
    };

    return (
      <Panel>
        <Panel.Body>
          <Form>
            <EmailField name="email" required validator={validator}>
              Email
            </EmailField>
          </Form>
        </Panel.Body>
      </Panel>
    );
  });
