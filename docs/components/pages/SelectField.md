---
prependJs:
- import { Form, Panel, SelectField } from "../../../src";
- import { OPTIONS } from "../utils";
---

## `<SelectField>`

A select form field.

* `autoFocus = false` - whether or not the component should request focus on initial mount
* `children` - the label to display for the field
* `className?` - an extra class name
* `creatable = false` - whether or not new options can be created
* `onChange?` - a function that accepts one argument that represents the new value of the input field
* `multiple = false` - whether or not to accept multiple values
* `name` - the name of the field
* `required = false` - indicates this field is required for submission
* `validator?` - a function that should either return an error message string or `null`
* `value?` - the value of the select field (should be a nullable array if multiple is set)

{{
  <Panel>
    <Panel.Body>
      <Form
        initialValues={{
          select: OPTIONS[0].value,
          "select-cr": OPTIONS[1].value,
          "select-ml": [OPTIONS[2].value, OPTIONS[3].value],
          "select-cr-ml": [OPTIONS[4].value, OPTIONS[5].value]
        }}
      >
        <SelectField
          name="select"
          options={OPTIONS}
          required
        >
          Select
        </SelectField>
        <SelectField name="select-cr" options={OPTIONS} creatable required>
          Select (Creatable)
        </SelectField>
        <SelectField name="select-ml" options={OPTIONS} multiple required>
          Select (Multiple)
        </SelectField>
        <SelectField
          name="select-cr-ml"
          options={OPTIONS}
          creatable
          multiple
          required
        >
          Select (Creatable, Multiple)
        </SelectField>
      </Form>
    </Panel.Body>
  </Panel>
}}
