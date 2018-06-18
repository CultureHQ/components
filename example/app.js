import React, { Fragment } from "react";
import ReactDOM from "react-dom";

import { Icon, Info, Success, Warning } from "../src";
import paths from "../src/icons.json";

const Heading = ({ children }) => <h1>{"<"}{children}{">"}</h1>;

const Icons = () => (
  Object.keys(paths).map(icon => (
    <span key={icon} title={icon}>
      <Icon icon={icon} />
    </span>
  ))
);

const App = () => (
  <Fragment>
    <Heading>Icon</Heading>
    <Icons />

    <Heading>Info</Heading>
    <Info>This is an info.</Info>

    <Heading>Success</Heading>
    <Success>This is a success.</Success>

    <Heading>Warning</Heading>
    <Warning>This is a warning.</Warning>
  </Fragment>
);

ReactDOM.render(<App />, document.getElementById("main"));
