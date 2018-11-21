---
prependJs:
- import { Badge } from "../../../src";
- import { onClick } from "../utils";
---

## `<Badge>`

A component for displaying associated metadata.

* `children` - displayed inside the badge
* `className?` - an extra class name
* `onClick?` - a click handler
* `primary = false` - indicates a primary color badge

{{
  <Badge>Default</Badge>{" "}
  <Badge primary onClick={onClick}>Primary</Badge>{" "}
  <Badge icon="clipboard">Icon</Badge>{" "}
  <Badge icon="clipboard" primary>Icon Primary</Badge>
}}
