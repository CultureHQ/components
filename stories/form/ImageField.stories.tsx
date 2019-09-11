import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { boolean, number, text } from "@storybook/addon-knobs";

import { ImageField, Form, Panel } from "../../src/components";
import { ImageFieldValue } from "../../src/components/form/ImageField";

const Container = (props: React.ComponentProps<typeof ImageField>) => (
  <Panel>
    <Panel.Body>
      <Form onSubmit={() => {}}>
        <ImageField {...props} />
      </Form>
    </Panel.Body>
  </Panel>
);

storiesOf("Form/ImageField", module)
  .add("default", () => {
    const children = text("children", "Image");
    const props = {
      aspectRatio: number("aspectRatio", 1),
      autoFocus: boolean("autoFocus", false),
      onChange: action("onChange"),
      progress: number("progress", 0),
      name: text("name", "image"),
      required: boolean("required", false),
      value: text("value", "culture.png")
    };

    return <Container {...props}>{children}</Container>;
  })
  .add("aspectRatio", () => (
    <Container name="image" aspectRatio={1}>Image</Container>
  ))
  .add("autoFocus", () => <Container name="image" autoFocus>Image</Container>)
  .add("required", () => <Container name="image" required>Image</Container>)
  .add("validator", () => {
    const validator = (value: ImageFieldValue) => {
      if (value instanceof File && value.type === "image/png") {
        return null;
      }
      return "We only support pngs.";
    };

    return (
      <Container name="image" required validator={validator}>Image</Container>
    );
  });
