---
prependJs:
- import { Cheer } from "../../../src";
---

## `<Cheer>`

An SVG of a person cheering.

* `className?` - an extra class name
* `color = "darkblue"` - sets the fill of the SVG, can be one of `darkblue`, `lightblue`, `yellow`, or `green`
* `name?` - an optional name that will appear in a tooltip
* `pop = false` - whether or not this `Cheer` should pop in
* `small = false` - indicates a small `Cheer`

{{
  <Cheer name="Harry" color="darkblue" pop />
  <Cheer name="Hermione" color="green" />
  <Cheer name="Ron" color="lightblue" />
  <Cheer name="Luna" color="yellow" />
  <Cheer small name="Dobby" color="darkblue" />
  <Cheer small name="Winky" color="green" />
}}
