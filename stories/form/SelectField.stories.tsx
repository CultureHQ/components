import React, { useState } from "react";
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

const selectedOptionsWithIcons = JSON.parse("[{\"label\":\"Board Games\",\"value\":948961810,\"categoryIcon\":\"heart-ol\",\"icon\":\"heart\",\"category\":\"interests\"},{\"label\":\"Books\",\"value\":169552531,\"categoryIcon\":\"heart-ol\",\"icon\":\"heart\",\"category\":\"interests\"},{\"label\":\"Business Development\",\"value\":948961807,\"categoryIcon\":\"heart-ol\",\"icon\":\"heart\",\"category\":\"interests\"},{\"label\":\"Critical thinking\",\"value\":948961813,\"categoryIcon\":\"heart-ol\",\"icon\":\"heart\",\"category\":\"interests\"},{\"label\":\"Data Presentation\",\"value\":948961805,\"categoryIcon\":\"heart-ol\",\"icon\":\"heart\",\"category\":\"interests\"},{\"label\":\"Financial Donations\",\"value\":948961808,\"categoryIcon\":\"heart-ol\",\"icon\":\"heart\",\"category\":\"interests\"},{\"label\":\"Flying\",\"value\":171211460,\"categoryIcon\":\"heart-ol\",\"icon\":\"heart\",\"category\":\"interests\"},{\"label\":\"Foodie\",\"value\":948961816,\"categoryIcon\":\"heart-ol\",\"icon\":\"heart\",\"category\":\"interests\"},{\"label\":\"Golf\",\"value\":948961817,\"categoryIcon\":\"heart-ol\",\"icon\":\"heart\",\"category\":\"interests\"},{\"label\":\"Marvel Movies\",\"value\":948961812,\"categoryIcon\":\"heart-ol\",\"icon\":\"heart\",\"category\":\"interests\"},{\"label\":\"Media Planning\",\"value\":948961803,\"categoryIcon\":\"heart-ol\",\"icon\":\"heart\",\"category\":\"interests\"},{\"label\":\"Music\",\"value\":948961815,\"categoryIcon\":\"heart-ol\",\"icon\":\"heart\",\"category\":\"interests\"},{\"label\":\"Online Marketing\",\"value\":948961811,\"categoryIcon\":\"heart-ol\",\"icon\":\"heart\",\"category\":\"interests\"},{\"label\":\"Pottery\",\"value\":948961814,\"categoryIcon\":\"heart-ol\",\"icon\":\"heart\",\"category\":\"interests\"},{\"label\":\"Quidditch\",\"value\":485974064,\"categoryIcon\":\"heart-ol\",\"icon\":\"heart\",\"category\":\"interests\"},{\"label\":\"Socks\",\"value\":511798724,\"categoryIcon\":\"heart-ol\",\"icon\":\"heart\",\"category\":\"interests\"},{\"label\":\"Tech support\",\"value\":948961804,\"categoryIcon\":\"heart-ol\",\"icon\":\"heart\",\"category\":\"interests\"},{\"label\":\"Whiskey\",\"value\":948961809,\"categoryIcon\":\"heart-ol\",\"icon\":\"heart\",\"category\":\"interests\"},{\"label\":\"Wine Making\",\"value\":948961806,\"categoryIcon\":\"heart-ol\",\"icon\":\"heart\",\"category\":\"interests\"},{\"label\":\"Boston\",\"value\":769302364,\"categoryIcon\":\"loc-ol\",\"icon\":\"ios-location\",\"category\":\"locations\"},{\"label\":\"Gryffindor\",\"value\":391844490,\"categoryIcon\":\"loc-ol\",\"icon\":\"ios-location\",\"category\":\"locations\"},{\"label\":\"Hogsmeade\",\"value\":332965554,\"categoryIcon\":\"loc-ol\",\"icon\":\"ios-location\",\"category\":\"locations\"},{\"label\":\"Hufflepuff\",\"value\":637227007,\"categoryIcon\":\"loc-ol\",\"icon\":\"ios-location\",\"category\":\"locations\"},{\"label\":\"King's Cross Station\",\"value\":174518033,\"categoryIcon\":\"loc-ol\",\"icon\":\"ios-location\",\"category\":\"locations\"},{\"label\":\"Ravenclaw\",\"value\":256326108,\"categoryIcon\":\"loc-ol\",\"icon\":\"ios-location\",\"category\":\"locations\"},{\"label\":\"Slytherin\",\"value\":769302361,\"categoryIcon\":\"loc-ol\",\"icon\":\"ios-location\",\"category\":\"locations\"},{\"label\":\"Charms\",\"value\":458291696,\"categoryIcon\":\"ios-people-outline\",\"icon\":\"ios-people\",\"category\":\"departments\"},{\"label\":\"Defense Against The Dark Arts\",\"value\":657580341,\"categoryIcon\":\"ios-people-outline\",\"icon\":\"ios-people\",\"category\":\"departments\"},{\"label\":\"Potions\",\"value\":857974512,\"categoryIcon\":\"ios-people-outline\",\"icon\":\"ios-people\",\"category\":\"departments\"},{\"label\":\"Sales\",\"value\":857974517,\"categoryIcon\":\"ios-people-outline\",\"icon\":\"ios-people\",\"category\":\"departments\"},{\"label\":\"Courage\",\"value\":820378242,\"categoryIcon\":\"hammer\",\"icon\":\"hammer-filled\",\"category\":\"skills\"},{\"label\":\"Dueling\",\"value\":922147076,\"categoryIcon\":\"hammer\",\"icon\":\"hammer-filled\",\"category\":\"skills\"},{\"label\":\"Financial Management\",\"value\":1004640654,\"categoryIcon\":\"hammer\",\"icon\":\"hammer-filled\",\"category\":\"skills\"},{\"label\":\"Flying\",\"value\":171211460,\"categoryIcon\":\"hammer\",\"icon\":\"hammer-filled\",\"category\":\"skills\"},{\"label\":\"Lead Generation\",\"value\":1004640653,\"categoryIcon\":\"hammer\",\"icon\":\"hammer-filled\",\"category\":\"skills\"},{\"label\":\"Pottery\",\"value\":1004640655,\"categoryIcon\":\"hammer\",\"icon\":\"hammer-filled\",\"category\":\"skills\"},{\"label\":\"Quidditch\",\"value\":485974064,\"categoryIcon\":\"hammer\",\"icon\":\"hammer-filled\",\"category\":\"skills\"},{\"label\":\"Soccer\",\"value\":1004640656,\"categoryIcon\":\"hammer\",\"icon\":\"hammer-filled\",\"category\":\"skills\"},{\"label\":\"Trouble\",\"value\":1004640652,\"categoryIcon\":\"hammer\",\"icon\":\"hammer-filled\",\"category\":\"skills\"}]");

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
  .add("creatable + not click in create option", () => (
    <Container>
      <SelectField name="select" creatable createClickNeeded={false} options={options}>Select</SelectField>
    </Container>
  ))
  .add("creatable + not click in create option + no clear value on open", () => (
    <Container>
      <SelectField name="select" creatable clearValueOnOpen={false} createClickNeeded={false} options={options}>Select</SelectField>
    </Container>
  ))
  .add("creatable + not click in create option + no clear value on open + test", () => (
    <Container>
      <Form onSubmit={() => {}} initialValues={{ question: "sorcerer" }} className="form">
        <SelectField name="question" creatable clearValueOnOpen={false} createClickNeeded={false} options={options}>Select</SelectField>
      </Form>
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
  .add("creatable + multiple + not click in create option", () => (
    <Container>
      <SelectField name="select" creatable multiple createClickNeeded={false} options={options}>Select</SelectField>
    </Container>
  ))
  .add("creatable + multiple + label", () => (
    <Container>
      <SelectField name="select" creatable creatableLabel="Create an interest" multiple options={options}>Select</SelectField>
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
  .add("options with icon", () => {
    const [selectedValues, setSelectedValues] = useState<Array<any>>([
      { value: "1", category: "Interest" },
      { value: "2", category: "Interest" }
    ]);

    const onChange = (value: any) => {
      setSelectedValues(value);
    };

    return (
      <Container>
        <SelectField name="select" multiple options={optionsWithIcons} value={selectedValues} onChange={onChange}>Select</SelectField>
      </Container>
    );
  })
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
  .add("Container Children", () => (
    <SelectField
      childIsLabel={false}
      name="allOptions"
      options={options}
      placeholder="Share with..."
      allowEmpty
      fixedValue
      imageIconPath="CultureHQ-logo.png"
      value="Fixed value"
      onChange={() => {}}
    >
      <div style={{ backgroundColor: "red", height: "40px", width: "40px" }} />
    </SelectField>
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
