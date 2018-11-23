---
prependJs:
- import Badge from "../Badge";
---

## `<Badge>`

A component for displaying associated metadata.

* `children` - displayed inside the badge
* `className?` - an extra class name
* `onClick?` - a click handler
* `primary = false` - indicates a primary color badge

{{
  <Badge>Default</Badge>{" "}
  <Badge primary onClick={() => alert("Clicked!")}>Primary</Badge>{" "}
  <Badge icon="clipboard">Icon</Badge>{" "}
  <Badge icon="clipboard" primary>Icon Primary</Badge>
}}
