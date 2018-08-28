import React from "react";

import {
  CentsField,
  EmailField,
  Form,
  NumberField,
  PasswordField,
  StringField,
  SubmitButton
} from "../../src";

const onSubmit = values => {
  console.log(values); // eslint-disable-line no-console
  return new Promise(resolve => setTimeout(() => resolve(), 1000));
};

const initialValues = {
  cents: 523,
  email: "kevin@culturehq.com",
  number: 42,
  password: "password",
  string: "@culturehq/components"
};

const FormContainer = () => (
  <Form onSubmit={onSubmit} initialValues={initialValues}>
    <CentsField name="cents" required>Cents</CentsField>
    <EmailField name="email" required>Email</EmailField>
    <NumberField name="number" required>Number</NumberField>
    <PasswordField name="password" required>Password</PasswordField>
    <StringField name="string" required>String</StringField>
    <SubmitButton primary />
  </Form>
);

export default FormContainer;
