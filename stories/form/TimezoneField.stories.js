import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { boolean, text } from "@storybook/addon-knobs";

import { TimezoneField, Form, Panel } from "../../src/components";

const Container = ({ children, ...props }) => (
  <Panel>
    <Panel.Body>
      <Form>
        <TimezoneField {...props}>{children}</TimezoneField>
      </Form>
    </Panel.Body>
  </Panel>
);

storiesOf("Form/TimezoneField", module)
  .add("default", () => {
    const children = text("children", "Timezone");
    const props = {
      autoFocus: boolean("autoFocus", false),
      onChange: action("onChange"),
      onOffsetChange: action("onOffsetChange"),
      name: text("name", "text"),
      required: boolean("required", false),
      value: text("value", undefined)
    };

    return <Container {...props}>{children}</Container>;
  })
  .add("autoFocus", () => (
    <Container name="timezone" autoFocus>Timezone</Container>
  ))
  .add("required", () => (
    <Container name="timezone" required>Timezone</Container>
  ))
  .add("validator", () => {
    const validator = value => {
      if (value !== "Pacific/Tahiti") {
        return null;
      }
      return "Can't go to Tahiti.";
    };

    return (
      <Container name="timezone" required validator={validator}>
        Timezone
      </Container>
    );
  });
