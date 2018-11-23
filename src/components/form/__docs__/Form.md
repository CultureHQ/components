---
prependJs:
- import Form from "../Form";
- import SelectField from "../SelectField";
- import { StringField } from "../FormFields";
- import SubmitButton from "../SubmitButton";
---

## `<Form>`

A generic form component.

* `children` - the fields to display inside the form
* `className?` - an extra class name
* `initialValues = {}` - the initial values of the form field
* `onSubmit` - a callback when the form has been submitted (expected to return a `Promise`)

{{
  <div>
    <Form
      onSubmit={
        values => {
          console.log(values);
          return new Promise(resolve => setTimeout(resolve, 1000));
        }
      }
    >
      <p>
        <StringField name="string" required>
          String
        </StringField>
      </p>
      <SubmitButton primary />
    </Form>
    <Form
      onSubmit={
        values => {
          console.log(values);
          return new Promise(resolve => setTimeout(resolve, 1000));
        }
      }
    >
      <StringField name="string" required>
        String
      </StringField>
      <SubmitButton primary />
    </Form>
  </div>
}}
