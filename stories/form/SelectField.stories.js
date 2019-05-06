import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { boolean, optionsKnob, text } from "@storybook/addon-knobs";

import { Form, Panel, SelectField } from "../../src/components";

const options = [
  { label: "The Sorcerer's Stone", value: "sorcerer" },
  { label: "The Chamber of Secrets", value: "chamber" },
  { label: "The Prisoner of Azkaban", value: "prisoner" },
  { label: "The Goblet of Fire", value: "goblet" },
  { label: "The Order of the Phoenix", value: "order" },
  { label: "The Half-Blood Prince", value: "prince" },
  { label: "The Deathly Hallows", value: "hallows" }
];

const valueOptions = options.reduce(
  (accum, option) => ({ ...accum, [option.label]: option.value }), {}
);

const Container = ({ children, ...props }) => (
  <Panel>
    <Panel.Body>
      <Form>
        <SelectField {...props} options={options}>{children}</SelectField>
      </Form>
    </Panel.Body>
  </Panel>
);

storiesOf("Form/SelectField", module)
  .add("default", () => {
    const children = text("children", "Select");
    const props = {
      autoFocus: boolean("autoFocus", false),
      creatable: boolean("creatable", false),
      onChange: action("onChange"),
      multiple: boolean("multiple", false),
      name: text("name", "select"),
      placeholder: text("placeholder", null),
      required: boolean("required", false),
      value: optionsKnob("value", valueOptions, [], {
        display: "multi-select"
      })
    };

    return <Container {...props}>{children}</Container>;
  })
  .add("autoFocus", () => <Container name="select" autoFocus>Select</Container>)
  .add("creatable", () => <Container name="select" creatable>Select</Container>)
  .add("multiple", () => <Container name="select" multiple>Select</Container>)
  .add("creatable + multiple", () => (
    <Container name="select" creatable multiple>Select</Container>
  ))
  .add("required", () => <Container name="select" required>Select</Container>)
  .add("validator", () => {
    const validator = value => {
      if (value !== "goblet") {
        return null;
      }
      return "No, goblet is the worst.";
    };

    return (
      <Container name="select" required validator={validator}>Select</Container>
    );
  });
