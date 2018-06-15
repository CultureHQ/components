import React, { Fragment } from "react";
import ReactDOM from "react-dom";

import { Info, Warning } from "../src";

const Heading = ({ children }) => <h1>{"<"}{children}{">"}</h1>;

const App = () => (
  <Fragment>
    <Heading>Info</Heading>
    <Info>This is an info.</Info>

    <Heading>Warning</Heading>
    <Warning>This is a warning.</Warning>
  </Fragment>
);

ReactDOM.render(<App />, document.getElementById("main"));
