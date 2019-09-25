import * as React from "react";
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
    const onSubmitAction = action("onSubmit");
    const onSubmit = (values: FormValues) => {
      onSubmitAction(values);
      return new Promise(resolve => setTimeout(resolve, 1000));
    };

    return (
      <Form onSubmit={onSubmit}>
        <EmailField name="email">Email</EmailField>
        <StringField name="string">String</StringField>
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
        <TextField name="text">Text</TextField>
        <DateTimeField name="datetime">DateTime</DateTimeField>
        <BooleanField name="boolean">Boolean</BooleanField>
        <ImageField name="image">Image</ImageField>
        <SubmitButton primary />
      </Form>
    );
  });
