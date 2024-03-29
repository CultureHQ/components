import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { boolean, number, text } from "@storybook/addon-knobs";

import { CentsField, Form, Panel } from "../../src/components";

const Container = (props: React.ComponentProps<typeof CentsField>) => (
  <Panel>
    <Panel.Body>
      <Form onSubmit={() => {}}>
        <CentsField {...props} />
      </Form>
    </Panel.Body>
  </Panel>
);

storiesOf("Form/CentsField", module)
  .add("default", () => {
    const children = text("children", "Cents");
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
  .add("autoFocus", () => <Container name="cents" autoFocus>Cents</Container>)
  .add("withIcon", () => <Container name="cents" icon="clock" value={1}>Cents</Container>)
  .add("disabled", () => <Container name="cents" disabled>Cents</Container>)
  .add("required", () => <Container name="cents" required>Cents</Container>);
