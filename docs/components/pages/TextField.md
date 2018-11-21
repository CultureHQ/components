---
prependJs:
- import { Form, Panel, TextField } from "../../../src";
---

## `<TextField>`

A text form field.

* `autoFocus = false` - whether or not the component should request focus on initial mount
* `children` - the label to display for the field
* `className?` - an extra class name
* `onChange?` - a function that accepts one argument that represents the new value of the input field
* `name` - the name of the field
* `required = false` - indicates this field is required for submission
* `validator?` - a function that should either return an error message string or `null`
* `value?` - the value of the input field

{{
  <Panel>
    <Panel.Body>
      <Form>
        <TextField name="text" required>Text</TextField>
      </Form>
    </Panel.Body>
  </Panel>
}}
