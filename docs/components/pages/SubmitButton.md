---
prependJs:
- import { Form, SubmitButton } from "../../../src";
---

## `<SubmitButton>`

A button used to submit a form. Accepts all of the same props as a regular `Button` component, with the addition/modification of:

* `children?` - a function that accepts a singular argument `submitting` that should return valid React children depending on that boolean argument
* `submitting` - a boolean value representing whether or not the form is currently submitting

{{
  <Form onSubmit={() => new Promise(resolve => setTimeout(resolve, 1000))}>
    <SubmitButton primary />
  </Form>
}}
