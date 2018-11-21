---
prependJs:
- import { DateTimeField, Form, Panel } from "../../../src";
---

## `<DateTimeField>`

A form field for selecting a date and time.

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
        <DateTimeField name="datetime" required>Date/Time</DateTimeField>
      </Form>
    </Panel.Body>
  </Panel>
}}
