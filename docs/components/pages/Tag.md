---
prependJs:
- import { Tag } from "../../../src";
---

## `<Tag>`

A component for displaying an associated status.

* `children` - displayed inside the tag
* `className?` - an extra class name
* `color = "blue"` - can be one of `blue`, `gray`, or `red`

{{
  <Tag>Blue</Tag>
  <Tag color="gray">Gray</Tag>
  <Tag color="red">Red</Tag>
}}
