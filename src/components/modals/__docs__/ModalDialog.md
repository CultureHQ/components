## `<ModalDialog>`

An accessible modal dialog wrapping `react-modal`. Note that if this component is going to be used, you need to call `ModalDialog.setAppElement("selector")` where `selector` is a valid HTML element selector representing the root of the React tree.

This component has the same subcomponents as the `Panel` component, just namespaced under the `ModalDialog` component, e.g., `ModalDialog.Heading`.

* `children` - the contents of the modal dialog
* `className?` - an extra class name
* `entrance = "slideIn"` - the entrance animation for the dialog, must be one of `slideIn` or `zoomIn`
* `onClose` - a callback function when the dialog is closed
* `width = "normal"` - the width of the modal window, either `narrow` or `normal`
