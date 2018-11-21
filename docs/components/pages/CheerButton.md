---
prependJs:
- import CheerButtonContainer from "../CheerButtonContainer";
---

## `<CheerButton>`

A button allows cheering some associated entity.

* `cheered` - the state of whether or not this entity has been cheered
* `className?` - an extra class name
* `name?` - an optional name that will appear in a tooltip
* `onCheerToggle` - a callback function that accepts a boolean `cheered` state and returns a `Promise`
- `small = false` - indicates a small button (text will be hidden)

{{
  <CheerButtonContainer />{" "}
  <CheerButtonContainer cheered name="Harry" /><br />
  <CheerButtonContainer small />{" "}
  <CheerButtonContainer small cheered name="Ron" />
}}
