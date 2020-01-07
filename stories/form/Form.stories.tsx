import React, { useState } from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import {
  BooleanField,
  DateTimeField,
  EmailField,
  Form,
  ImageField,
  SelectField,
  StringField,
  SubmitButton,
  TextField
} from "../../src/components";
import { FormValues } from "../../src/components/form/Form";

storiesOf("Form/Form", module)
  .add("default", () => {
    const [disabled, setDisabled] = useState(false);

    const onSubmitAction = action("onSubmit");
    const onSubmit = (values: FormValues) => {
      setDisabled(value => !value);
      onSubmitAction(values);
      return new Promise(resolve => setTimeout(resolve, 1000));
    };

    return (
      <Form onSubmit={onSubmit}>
        <EmailField name="email" disabled={disabled}>Email</EmailField>
        <StringField name="string" disabled={disabled}>String</StringField>
        <SelectField
          name="select"
          options={[
            { value: "1", label: "One" },
            { value: "2", label: "Two" },
            { value: "3", label: "Three" }
          ]}
        >
          Select
        </SelectField>
        <TextField name="text" disabled={disabled}>Text</TextField>
        <DateTimeField name="datetime">DateTime</DateTimeField>
        <BooleanField name="boolean">Boolean</BooleanField>
        <ImageField name="image">Image</ImageField>
        <SubmitButton primary />
      </Form>
    );
  });
