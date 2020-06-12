import React from "react";
import { storiesOf } from "@storybook/react";
import { boolean, text } from "@storybook/addon-knobs";

import { Form, Panel, SelectField } from "../../src/components";
import { IconName } from "../../src/components/Icon";

const emptyOptions: { label: string; value: string }[] = [];

const options = [
  { label: "The Sorcerer's Stone", value: "sorcerer" },
  { label: "The Chamber of Secrets", value: "chamber" },
  { label: "The Prisoner of Azkaban", value: "prisoner" },
  { label: "The Goblet of Fire", value: "goblet" },
  { label: "The Order of the Phoenix", value: "order" },
  { label: "The Half-Blood Prince", value: "prince" },
  { label: "The Deathly Hallows", value: "hallows" }
];

const selectedOptionsWithIcons = [
  { label: "The Sorcerer's Stone", value: "sorcerer", icon: "heart" as IconName, categoryIcon: "heart-ol" as IconName },
  { label: "The Chamber of Secrets", value: "chamber", icon: "heart" as IconName, categoryIcon: "heart-ol" as IconName },
  { label: "The Prisoner of Azkaban", value: "prisoner", icon: "heart" as IconName, categoryIcon: "heart-ol" as IconName },
  { label: "The Goblet of Fire", value: "goblet", icon: "ios-people" as IconName, categoryIcon: "ios-people-outline" as IconName },
  { label: "The Order of the Phoenix", value: "order", icon: "ios-people" as IconName, categoryIcon: "ios-people-outline" as IconName },
  { label: "The Half-Blood Prince", value: "prince", icon: "ios-people" as IconName, categoryIcon: "ios-people-outline" as IconName },
  { label: "The Deathly Hallows", value: "hallows", icon: "ios-people" as IconName, categoryIcon: "ios-people-outline" as IconName }
];

const optionsWithIcons = [
  { value: "1", label: "One", icon: "heart" as IconName, category: "Interest", categoryIcon: "heart-ol" as IconName },
  { value: "2", label: "Two", icon: "heart" as IconName, category: "Interest", categoryIcon: "heart-ol" as IconName },
  { value: "3", label: "Three", icon: "heart" as IconName, category: "Interest", categoryIcon: "heart-ol" as IconName }
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
  .add("disabled", () => (
    <Container>
      <SelectField name="select" disabled options={options}>Select</SelectField>
    </Container>
  ))
  .add("multiple", () => (
    <Container>
      <SelectField name="select" multiple options={options}>Select</SelectField>
    </Container>
  ))
  .add("multiple + disabled", () => (
    <Container>
      <SelectField name="select" multiple disabled options={options}>Select</SelectField>
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
  .add("selected option with icon", () => (
    <Container>
      <SelectField name="select" multiple options={selectedOptionsWithIcons}>Select</SelectField>
    </Container>
  ))
  .add("options with icon", () => (
    <Container>
      <SelectField name="select" multiple options={optionsWithIcons}>Select</SelectField>
    </Container>
  ))
  .add("input with image icon", () => (
    <Container>
      <SelectField name="select" options={options} imageIconPath="CultureHQ-logo.png">Select</SelectField>
    </Container>
  ))
  .add("input fixed", () => (
    <Container>
      <SelectField name="select" options={emptyOptions} allowEmpty fixedValue value="Fixed value here">Select</SelectField>
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
