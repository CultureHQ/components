---
prependJs:
- import { Form, MultiImageField, Panel } from "../../../src";
---

## `<MultiImageField>`

A image field component for selecting multiple images.

* `aspectRatio = null` - the enforced aspect ratio on the cropper
* `autoFocus = false` - whether or not the component should request focus on initial mount
* `children` - the label to display for the field
* `className?` - an extra class name
* `name` - the name of the field
* `onChange?` - a function that accepts one argument that represents the new value of the file field
* `value?` - the value of the input field

{{
  <Panel>
    <Panel.Body>
      <Form>
        <MultiImageField name="images">Images</MultiImageField>
      </Form>
    </Panel.Body>
  </Panel>
}}
