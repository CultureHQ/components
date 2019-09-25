import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { boolean, text } from "@storybook/addon-knobs";

import { NumberField, Form, Panel } from "../../src/components";

const Container = (props: React.ComponentProps<typeof NumberField>) => (
  <Panel>
    <Panel.Body>
      <Form onSubmit={() => {}}>
        <NumberField {...props} />
      </Form>
    </Panel.Body>
  </Panel>
);

storiesOf("Form/NumberField", module)
  .add("default", () => {
    const children = text("children", "Number");
    const props = {
      autoFocus: boolean("autoFocus", false),
      onChange: action("onChange"),
      name: text("name", "number"),
      required: boolean("required", false),
      value: text("value", "")
    };

    return <Container {...props}>{children}</Container>;
  })
  .add("autoFocus", () => <Container name="number" autoFocus>Number</Container>)
  .add("required", () => <Container name="number" required>Number</Container>)
  .add("validator", () => {
    const validator = (value: string) => {
      const number = parseFloat(value);

      if (number >= 1 && number <= 10) {
        return null;
      }
      return "Value must be between 1 and 10.";
    };

    return (
      <Container name="number" required validator={validator}>Number</Container>
    );
  });
