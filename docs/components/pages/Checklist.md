---
prependJs:
- import { Checklist } from "../../../src";
---

## `<Checklist>`

A list of items and their associated status.

* `children` - checklist items, usually `Checklist.Item` components
* `className?` - an extra class name

### `<Checklist.Item>`

* `children` - displayed inside the item
* `checked = false` - boolean value of whether or not this item is complete

{{
  <Checklist>
    <Checklist.Item checked>Checked</Checklist.Item>
    <Checklist.Item>Unchecked</Checklist.Item>
  </Checklist>
}}
