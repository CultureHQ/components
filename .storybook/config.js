import { addDecorator, addParameters, configure } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs";
import { withA11y } from "@storybook/addon-a11y";

import theme from "./theme";
import "../src/styles/app.scss";
import "./styles.css";

addDecorator(withKnobs);
addDecorator(withA11y);
addParameters({ options: { theme } });

const req = require.context("../stories", true, /\.stories\.js$/);
configure(() => req.keys().forEach(req), module);
