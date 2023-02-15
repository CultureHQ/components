import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { boolean, number, text } from "@storybook/addon-knobs";

import { Form, MillisecondsField, Panel } from "../../src/components";

const Container = (props: React.ComponentProps<typeof MillisecondsField>) => (
  <Panel>
    <Panel.Body>
      <Form onSubmit={() => {}}>
        <MillisecondsField {...props} />
      </Form>
    </Panel.Body>
  </Panel>
);

storiesOf("Form/MillisecondsField", module)
  .add("default", () => {
    const children = text("children", "Time");
    const props = {
      autoFocus: boolean("autoFocus", false),
      disabled: boolean("disabled", false),
      onChange: action("onChange"),
      name: text("name", "cents"),
      required: boolean("required", false),
      value: number("value", 0)
    };

    return <Container {...props}>{children}</Container>;
  })
  .add("autoFocus", () => <Container name="cents" autoFocus>Time</Container>)
  .add("disabled", () => <Container name="cents" disabled>Time</Container>)
  .add("required", () => <Container name="cents" required>Time</Container>);
