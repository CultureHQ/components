import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { boolean, optionsKnob, text } from "@storybook/addon-knobs";

import { RadioField, Form, Panel } from "../../src/components";

const options = [
  { value: "gryffindor", label: "Gryffindor" },
  { value: "hufflepuff", label: "Hufflepuff" },
  { value: "ravenclaw", label: "Ravenclaw" },
  { value: "slytherin", label: "Slytherin" }
];

const valueOptions = options.reduce(
  (accum, option) => ({ ...accum, [option.label]: option.value }), {}
);

const Container = (props: Omit<React.ComponentProps<typeof RadioField>, "options">) => (
  <Panel>
    <Panel.Body>
      <Form onSubmit={() => {}}>
        <RadioField {...props} options={options} />
      </Form>
    </Panel.Body>
  </Panel>
);

storiesOf("Form/RadioField", module)
  .add("default", () => {
    const children = text("children", "Radio");
    const props = {
      autoFocus: boolean("autoFocus", false),
      onChange: action("onChange"),
      name: text("name", "radio"),
      required: boolean("required", false),
      value: optionsKnob("value", valueOptions, null, {
        display: "inline-radio"
      })
    };

    return <Container {...props}>{children}</Container>;
  })
  .add("autoFocus", () => <Container name="radio" autoFocus>Radio</Container>)
  .add("required", () => <Container name="radio" required>Radio</Container>)
  .add("validator", () => {
    const validator = (value: string | number) => {
      if (value !== "slytherin") {
        return null;
      }
      return "Value cannot be slytherin.";
    };

    return (
      <Container name="radio" required validator={validator}>Radio</Container>
    );
  });
