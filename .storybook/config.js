import { addDecorator, addParameters, configure } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs";
import { withA11y } from "@storybook/addon-a11y";
import { withInfo } from "@storybook/addon-info";

import { ModalDialog } from "../src/components";
import "../src/styles/app.scss";

import theme from "./theme";
import "./styles.css";

ModalDialog.setAppElement(document.body);

addDecorator(withKnobs);
addDecorator(withA11y);
addDecorator(withInfo);

addParameters({
  options: {
    panelPosition: "bottom",
    theme
  }
});

const req = require.context("../stories", true, /\.stories\.js$/);
configure(() => req.keys().forEach(req), module);
