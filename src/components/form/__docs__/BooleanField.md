---
prependJs:
- import BooleanField from "../BooleanField";
- import Form from "../Form";
---

## `<BooleanField>`

A form field that represents a boolean value.

* `children` - the label to display for the field
* `className?` - an extra class name
* `onChange?` - a function that accepts one argument that represents the new value of the field
* `name` - the name of the field
* `value?` - the value of the input field

{{
  <Form>
    <BooleanField name="boolean">Boolean</BooleanField>
  </Form>
}}
