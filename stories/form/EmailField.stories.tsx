import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { boolean, text } from "@storybook/addon-knobs";

import { EmailField, Form, Panel } from "../../src/components";

const Container = (props: React.ComponentProps<typeof EmailField>) => (
  <Panel>
    <Panel.Body>
      <Form onSubmit={() => {}}>
        <EmailField {...props} />
      </Form>
    </Panel.Body>
  </Panel>
);

storiesOf("Form/EmailField", module)
  .add("default", () => {
    const children = text("children", "Email");
    const props = {
      autoFocus: boolean("autoFocus", false),
      disabled: boolean("disabled", false),
      onChange: action("onChange"),
      name: text("name", "email"),
      required: boolean("required", false),
      value: text("value", "")
    };

    return <Container {...props}>{children}</Container>;
  })
  .add("autoFocus", () => <Container name="email" autoFocus>Email</Container>)
  .add("disabled", () => <Container name="email" disabled>Email</Container>)
  .add("required", () => <Container name="email" required>Email</Container>)
  .add("validator", () => {
    const validator = (value: string) => {
      if (value.match(/^[a.@]+$/)) {
        return null;
      }
      return "Value can only include `a`s, `.`s, and `@`s.";
    };

    return (
      <Container name="email" required validator={validator}>Email</Container>
    );
  });
