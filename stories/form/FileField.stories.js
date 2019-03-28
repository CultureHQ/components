import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { boolean, files, text } from "@storybook/addon-knobs";

import { FileField, Form, Panel } from "../../src/components";

const Container = ({ children, ...props }) => (
  <Panel>
    <Panel.Body>
      <Form>
        <FileField {...props}>{children}</FileField>
      </Form>
    </Panel.Body>
  </Panel>
);

storiesOf("Form/FileField", module)
  .add("default", () => {
    const children = text("children", "File");
    const props = {
      autoFocus: boolean("autoFocus", false),
      onChange: action("onChange"),
      multiple: boolean("multiple", false),
      name: text("name", "file"),
      required: boolean("required", false),
      value: files("value", "*", null)
    };

    return <Container {...props}>{children}</Container>;
  })
  .add("autoFocus", () => <Container name="file" autoFocus>File</Container>)
  .add("multiple", () => <Container name="files" multiple>File</Container>)
  .add("required", () => <Container name="file" required>File</Container>)
  .add("validator", () => {
    const validator = value => {
      if (value >= 1 && value <= 10) {
        return null;
      }
      return "Value must be between 1 and 10.";
    };

    return (
      <Container name="file" required validator={validator}>File</Container>
    );
  });
