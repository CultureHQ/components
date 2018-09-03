import React from "react";

import {
  CentsField,
  EmailField,
  Form,
  NumberField,
  PasswordField,
  StringField,
  SubmitButton,
  BooleanField,
  FileField
} from "../../src";

const onSubmit = values => {
  console.log(values); // eslint-disable-line no-console
  return new Promise(resolve => setTimeout(() => resolve(), 1000));
};

const FormContainer = () => (
  <Form onSubmit={onSubmit}>
    <CentsField name="cents" required>Cents</CentsField>
    <EmailField name="email" required>Email</EmailField>
    <NumberField name="number" required>Number</NumberField>
    <PasswordField name="password" required>Password</PasswordField>
    <StringField name="string" required>String</StringField>
    <BooleanField name="boolean">Boolean</BooleanField>
    <FileField name="file" required>File</FileField>
    <FileField name="files" multiple required>Files</FileField>
    <SubmitButton primary />
  </Form>
);

export default FormContainer;
