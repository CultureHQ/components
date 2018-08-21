import React from "react";

import {
  CentsField,
  EmailField,
  Form,
  NumberField,
  PasswordField,
  StringField
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
    <CentsField label="Cents" name="cents" required />
    <EmailField label="Email" name="email" required />
    <NumberField label="Number" name="number" required />
    <PasswordField label="Password" name="password" required />
    <StringField label="String" name="string" required />
  </Form>
);

export default FormContainer;
