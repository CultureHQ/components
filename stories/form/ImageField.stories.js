import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { boolean, number, text } from "@storybook/addon-knobs";

import { ImageField, Form, Panel } from "../../src/components";

const Container = ({ children, ...props }) => (
  <Panel>
    <Panel.Body>
      <Form>
        <ImageField {...props}>{children}</ImageField>
      </Form>
    </Panel.Body>
  </Panel>
);

storiesOf("Form/ImageField", module)
  .add("default", () => {
    const children = text("children", "Image");
    const props = {
      aspectRatio: number("aspectRatio", null),
      autoFocus: boolean("autoFocus", false),
      onChange: action("onChange"),
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
    const validator = value => {
      if (value.type === "image/png") {
        return null;
      }
      return "We only support pngs.";
    };

    return (
      <Container name="image" required validator={validator}>Image</Container>
    );
  });
