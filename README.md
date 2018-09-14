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

## Development

Ensure you have `node` and `yarn` installed on your system. Then run `yarn` in the root of the repository to install the dependencies. You can then start the local server with `yarn start`. You can now view the various components at `http://localhost:8080`.
