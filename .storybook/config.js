import { addDecorator, addParameters, configure } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs";

import theme from "./theme";
import "../src/styles/app.scss";
import "./styles.css";

addDecorator(withKnobs);
addParameters({ options: { theme } });

const req = require.context("../stories", true, /\.stories\.js$/);
configure(() => req.keys().forEach(req), module);
