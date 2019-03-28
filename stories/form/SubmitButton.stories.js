import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { boolean, text } from "@storybook/addon-knobs";

import { Form, SubmitButton } from "../../src/components";

storiesOf("Form/SubmitButton", module)
  .add("default", () => {
    const texts = {
      submit: text("submit", "Submit"),
      submitting: text("submitting", "Submitting...")
    };

    const props = {
      primary: boolean("primary", false)
    };

    const onSubmitAction = action("onSubmit");
    const onSubmit = () => {
      onSubmitAction();
      return new Promise(resolve => setTimeout(resolve, 1000));
    };

    return (
      <Form onSubmit={onSubmit}>
        <SubmitButton {...props}>
          {submitting => submitting ? texts.submitting : texts.submit}
        </SubmitButton>
      </Form>
    );
  });
