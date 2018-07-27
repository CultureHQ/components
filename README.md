# @CultureHQ/components

CultureHQ's component library.

## Usage

You can import all of the components as separate named exports from the main package. As in:

```javascript
import { Button } from "@CultureHQ/components";

const App = () => (
  <Button primary icon="clipboard">Take Survey</Button>
);

export default App;
```

To get the styles, be sure to also import `@CultureHQ/components/dist/main.css` into whatever stylesheet you're using.

Below are listed each component with their various semantics.

### Badge

A component for displaying associated metadata.

* `children` - displayed inside the badge
* `className?` - an extra class name
* `onClick?` - a click handler
* `primary? = false` - indicates a primary badge

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
