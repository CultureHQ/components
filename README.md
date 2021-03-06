# @culturehq/components

[![Build Status](https://github.com/CultureHQ/components/workflows/Main/badge.svg)](https://github.com/CultureHQ/components/actions)
[![Package Version](https://img.shields.io/npm/v/@culturehq/components.svg)](https://www.npmjs.com/package/@culturehq/components)

CultureHQ's component library.

## Usage

You can import all of the components as separate named exports from the main package. As in:

```javascript
import { Button } from "@culturehq/components";

const App = () => (
  <Button primary icon="clipboard">
    Take Survey
  </Button>
);

export default App;
```

To get the styles, be sure to also import `@culturehq/components/dist/main.css` into whatever stylesheet you're using.

## Development

Ensure you have `node` and `yarn` installed on your system. Then run `yarn` in the root of the repository to install the dependencies. You can then start the storybook server with `yarn start` and view the output at `http://localhost:6006`.

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/CultureHQ/components.

## License

The code is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
