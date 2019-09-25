import React from "react";
import { storiesOf } from "@storybook/react";
import { boolean, text } from "@storybook/addon-knobs";

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

const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Panel>
    <Panel.Body>
      <Form onSubmit={() => {}}>
        {children}
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
      multiple: boolean("multiple", false),
      name: text("name", "select"),
      placeholder: text("placeholder", ""),
      required: boolean("required", false)
    };

    return (
      <Container>
        <SelectField {...props} options={options}>{children}</SelectField>
      </Container>
    );
  })
  .add("autoFocus", () => (
    <Container>
      <SelectField name="select" autoFocus options={options}>Select</SelectField>
    </Container>
  ))
  .add("creatable", () => (
    <Container>
      <SelectField name="select" creatable options={options}>Select</SelectField>
    </Container>
  ))
  .add("multiple", () => (
    <Container>
      <SelectField name="select" multiple options={options}>Select</SelectField>
    </Container>
  ))
  .add("creatable + multiple", () => (
    <Container>
      <SelectField name="select" creatable multiple options={options}>Select</SelectField>
    </Container>
  ))
  .add("required", () => (
    <Container>
      <SelectField name="select" required options={options}>Select</SelectField>
    </Container>
  ))
  .add("validator", () => {
    const validator = (value: null | string) => {
      if (value !== "goblet") {
        return null;
      }
      return "No, goblet is the worst.";
    };

    return (
      <Container>
        <SelectField name="select" required validator={validator} options={options}>
          Select
        </SelectField>
      </Container>
    );
  });
