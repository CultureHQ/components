# @culturehq/components

[![Build Status](https://travis-ci.com/CultureHQ/components.svg?branch=master)](https://travis-ci.com/CultureHQ/components)
[![Package Version](https://img.shields.io/npm/v/@culturehq/components.svg)](https://www.npmjs.com/package/@culturehq/components)
[![Minified GZipped Size](https://img.shields.io/bundlephobia/minzip/@culturehq/components.svg)](https://www.npmjs.com/package/@culturehq/components)

CultureHQ's component library.

## Usage

You can import all of the components as separate named exports from the main package. As in:

```javascript
import { Button } from "@culturehq/components";

const App = () => (
  <Button primary icon="clipboard">Take Survey</Button>
);

export default App;
```

To get the styles, be sure to also import `@culturehq/components/dist/main.css` into whatever stylesheet you're using.

Below are listed each component with their various semantics:

- [Badge](#badge)
- [Button](#button)
- [CentsField](#centsfield)
- [Checklist](#checklist)
- [Checkmark](#checkmark)
- [Circles](#circles)
- [EmailField](#emailfield)
- [FeedItem](#feeditem)
- [Form](#form)
- [Hamburger](#hamburger)
- [Icon](#icon)
- [Info](#info)
- [Loader](#loader)
- [Nav](#nav)
- [NumberField](#numberfield)
- [Pagination](#pagination)
- [Panel](#panel)
- [PasswordField](#passwordfield)
- [Spinner](#spinner)
- [StringField](#stringfield)
- [Subnav](#subnav)
- [Success](#success)
- [Tag](#tag)
- [Thumbnail](#thumbnail)
- [Warning](#warning)

### Badge

A component for displaying associated metadata.

* `children` - displayed inside the badge
* `className?` - an extra class name
* `onClick?` - a click handler
* `primary? = false` - indicates a primary badge

### Button

A generic button component.

* `children` - displayed inside the button
* `className?` - an extra class name
* `disabled?` - disallows clicking on the button
* `icon?` - an icon to display inside the button
* `inverted?` - indicates the inverted theme
* `loading?` - displays a spinner inside the button
* `onClick` - the callback when the button is clicked
* `primary?` - indicates a larger primary button
* `small?` - indicates a small button
* `type? = "button"` - the type of the button component

### CentsField

A number form field that tracks in cents and displays in dollar amounts.

* `className?` - an extra class name
* `label` - the label to display for the field
* `name` - the name of the field
* `required?` - indicates this field is required for submission

### Checklist

A list of items and their associated status.

* `children` - checklist items, usually `Checklist.Item` components
* `className?` - an extra class name

`Checklist.Item` subcomponent:

* `children` - displayed inside the item
* `checked?` - boolean value of whether or not this item is complete

### Checkmark

A boolean value represented by a circle with an optional check.

* `checked?` - boolean value of whether or not this item is complete
* `className?` - an extra class name
* `onClick?` - a click handler (allows this to be a controller component)

### Circles

The CultureHQ circles.

* `className?` - an extra class name

### EmailField

A string form field that accepts an email.

* `className?` - an extra class name
* `label` - the label to display for the field
* `name` - the name of the field
* `required?` - indicates this field is required for submission

### FeedItem

A contained item in a feed.

* `children` - sections of the item, usually `FeedItem.Body` and `FeedItem.Footer` components
* `className?` - an extra class name

`FeedItem.Body` subcomponent:

* `children` - displayed inside the body
* `className?` - an extra class name

`FeedItem.Footer` subcomponent:

* `children` - displayed inside the footer
* `className?` - an extra class name

### Form

A generic form component.

* `children` - the fields to display inside the form (expected to be one of the form fields in this component library)
* `className?` - an extra class name
* `initialValues` - the initial values of the form fields
* `onSubmit` - a callback when the form has been submitted (expected to return a `Promise`)

### Hamburger

A boolean value represented by a hamburger or an x depending on status.

* `className?` - an extra class name
* `onToggle` - a function called when the hamburger is toggled
* `open` - whether or not the hamburger should be displayed as open

### Icon

An SVG icon that fetches its paths asynchronously.

* `className?` - an extra class name
* `icon` - the name of the path to display (see [src/icons.json](src/icons.json) for the valid keys)

### Info

Displays a informational message.

* `children` - displayed inside the box
* `className?` - an extra class name

### Loader

A component that waits for something to be loaded, and displays a spinner if it takes too long to load.

* `children` - the components to display once `loading` is false
* `loading` - whether or not `loading` is taking place

### Nav

A top-level nav that displays at the top of the page. It hides when you scroll down and shows when you scroll up.

* `children` - the components to display inside the nav
* `className?` - an extra class name

### NumberField

A number form field.

* `className?` - an extra class name
* `label` - the label to display for the field
* `name` - the name of the field
* `required?` - indicates this field is required for submission

### Pagination

Displays pagination information with buttons for looking through different pages.

* `className?` - an extra class name
* `currentPage` - an integer representing the current page number
* `onClick` - a callback function that will be called with the new page number when the page is changed
* `totalPages` - an integer representing the total number of pages

### Panel

Boxed information to be displayed. Always has a header and sometimes has a footer.

* `children` - the components to be displayed inside the panel, expected to be instances of `Panel.Heading`, `Panel.Body`, or `Panel.Footer`
* `className?` - an extra class name

`Panel.Heading` subcomponent:

* `children` - the content of the heading
* `className?` - an extra class name

`Panel.Body` subcomponent:

* `children` - the content of the body
* `className?` - an extra class name

`Panel.Footer` subcomponent:

* `children` - the content of the footer
* `className?` - an extra class name

### PasswordField

A password form field.

* `className?` - an extra class name
* `label` - the label to display for the field
* `name` - the name of the field
* `required?` - indicates this field is required for submission

### Spinner

A circular spinner using the CultureHQ colors.

* `className?` - an extra class name
* `placeholder?` - indicates that this spinner is a placeholder, and should take up more room

### StringField

A string form field.

* `className?` - an extra class name
* `label` - the label to display for the field
* `name` - the name of the field
* `required?` - indicates this field is required for submission

### Subnav

A navigation menu for within the application. Can function as either a controlled component or an uncontrolled component.

* `activeIndex?` - an integer that represents the index of the child that is currently active, passed if you want to use this component as a controlled component
* `children` - a list of subnav items, usually `Subnav.Item` components
* `className?` - an extra class name
* `onChange` - a function that is called with the index of the new active item when the subnav changes

`Subnav.Item` subcomponent:

* `children` - the content of the nav link
* `className?` - an extra class name

### Success

Displays a success message.

* `children` - displayed inside the box
* `className?` - an extra class name

### Tag

A component for displaying an associated status.

* `children` - displayed inside the tag
* `className?` - an extra class name
* `color? = "blue"` - can be one of `"blue"`, `"gray"`, or `"red"`

### Thumbnail

A small image that should be displayed inline.

* `className?` - an extra class name
* `image` - the image to be displayed
* `size? = "small"` - can be `"small"`, `"medium"`, or `"large"`
* `square? = false` - whether or not this image should be displayed as a square
* `title?` - an optional title for the image

### Warning

Displays a warning message.

* `children` - displayed inside the box
* `className?` - an extra class name

## Development

Ensure you have `node` and `yarn` installed on your system. Then run `yarn` in the root of the repository to install the dependencies. You can then start the local server with `yarn start`. You can now view the various components at `http://localhost:8080`.
