import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { optionsKnob, text } from "@storybook/addon-knobs";

import { BooleanField, Form } from "../../src/components";

const valueOptions = {
  null: "null",
  true: "true",
  false: "false"
};

storiesOf("Form/BooleanField", module)
  .add("default", () => {
    const children = text("children", "Boolean");
    const value = optionsKnob("value", valueOptions, null, {
      display: "inline-radio"
    });

    const props = {
      onChange: action("onChange"),
      name: text("name", "boolean"),
      value: { null: null, true: true, false: false }[value]
    };

    return (
      <Form>
        <BooleanField {...props}>{children}</BooleanField>
      </Form>
    );
  });
