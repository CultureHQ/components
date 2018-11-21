---
prependJs:
- import { Panel } from "../../../src";
---

## `<Panel>`

Boxed information to be displayed. May additionally contain a heading or footer.

* `children` - the components to be displayed inside the panel, usually instances of `Panel.Heading`, `Panel.Body`, `Panel.LoaderBody`, or `Panel.Footer`
* `className?` - an extra class name
* `limitWidth = false` - whether or not to apply a maximum width and center the panel

### `<Panel.Heading>`

* `children` - the content of the heading
* `className?` - an extra class name
* `primary = false` - whether or not this should be displayed as a primary heading (with a primary background color)

### `<Panel.Body>`

* `children` - the content of the body
* `className?` - an extra class name

### `<Panel.LoaderBody>`

* `children` - the content of the body
* `className?` - an extra class name
* `loading` - whether or not the content is still loading

### `<Panel.Footer>`

* `children` - the content of the footer
* `className?` - an extra class name

{{
  <Panel>
    <Panel.Heading>Heading</Panel.Heading>
    <Panel.Body>Body</Panel.Body>
    <Panel.Footer>Footer</Panel.Footer>
  </Panel>

  <Panel>
    <Panel.Heading primary>Primary Heading</Panel.Heading>
    <Panel.Body>Body</Panel.Body>
  </Panel>

  <Panel limitWidth>
    <Panel.Body>A limited width panel.</Panel.Body>
  </Panel>
}}
