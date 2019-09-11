import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { boolean, files, text } from "@storybook/addon-knobs";

import { FileField, Form, Panel } from "../../src/components";
import { FileFieldValue } from "../../src/components/form/FileField";

const Container = (props: React.ComponentProps<typeof FileField>) => (
  <Panel>
    <Panel.Body>
      <Form onSubmit={() => {}}>
        <FileField {...props} />
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
      value: files("value", "*", [])
    };

    return <Container {...props}>{children}</Container>;
  })
  .add("autoFocus", () => <Container name="file" autoFocus>File</Container>)
  .add("multiple", () => <Container name="files" multiple>File</Container>)
  .add("required", () => <Container name="file" required>File</Container>)
  .add("validator", () => {
    const validator = (value: FileFieldValue) => {
      if (value instanceof File && value.type === "image/png") {
        return null;
      }
      return "We only support pngs.";
    };

    return (
      <Container name="file" required validator={validator}>File</Container>
    );
  });
