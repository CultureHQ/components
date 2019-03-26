import { configure } from "@storybook/react";
import "../src/styles/app.scss";

const req = require.context("../stories", true, /\.stories\.js$/);
configure(() => req.keys().forEach(req), module);
