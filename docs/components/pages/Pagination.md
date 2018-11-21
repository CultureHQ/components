---
prependJs:
- import PaginationContainer from "../PaginationContainer";
---

## `<Pagination>`

Displays pagination information with buttons for looking through different pages.

* `className?` - an extra class name
* `currentPage` - an integer representing the current page number
* `onClick` - a callback function that will be called with the new page number when the page is changed
* `totalPages` - an integer representing the total number of pages

{{
  <PaginationContainer />
}}
