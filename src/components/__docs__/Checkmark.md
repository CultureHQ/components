---
prependJs:
- import CheckmarkContainer from "./CheckmarkContainer";
---

## `<Checkmark>`

A boolean value represented by a circle with an optional check.

* `checked = false` - boolean value of whether or not this item is complete
* `children?` - an optional label for the circle
* `className?` - an extra class name
* `onClick?` - a click handler (allows this to be a controlled component)

{{
  <CheckmarkContainer />
}}
