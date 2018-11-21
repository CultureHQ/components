---
prependJs:
- import LoaderContainer from "../LoaderContainer";
---

## `<Loader>`

A component that waits for something to be loaded, and displays a spinner if it takes too long to load.

* `children` - the components to display once `loading` is false
* `loading` - whether or not `loading` is taking place

{{
  <LoaderContainer />
}}
