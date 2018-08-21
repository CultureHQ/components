import React from "react";

import {
  EmailField,
  Form,
  NumberField,
  PasswordField,
  StringField
} from "../../src";

const onSubmit = () => (
  new Promise(resolve => setTimeout(() => resolve(), 1000))
);

const FormContainer = () => (
  <Form onSubmit={onSubmit}>
    <EmailField label="Email" name="email" required />
    <NumberField label="Number" name="number" required />
    <PasswordField label="Password" name="password" required />
    <StringField label="String" name="string" required />
  </Form>
);

export default FormContainer;
