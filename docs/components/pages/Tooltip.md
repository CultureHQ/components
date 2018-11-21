---
prependJs:
- import { Button, Tooltip } from "../../../src";
- import { TEXT } from "../utils";
---

## `<Tooltip>`

A tip that pops over the content inside of it. Aware of the left side of the page.

* `children` - the content that has a tip
* `className?` - an extra class name
* `tip` - the content to display inside the tip

{{
  <Tooltip tip={TEXT}>
    <Button primary disabled>Some action</Button>
  </Tooltip>
}}
