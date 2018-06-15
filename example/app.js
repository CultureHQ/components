import React, { Fragment } from "react";
import ReactDOM from "react-dom";

import { Warning } from "../src";

const App = () => (
  <Fragment>
    <h1>{"<"}Warning{">"}</h1>
    <Warning>This is a warning.</Warning>
  </Fragment>
);

ReactDOM.render(<App />, document.getElementById("main"));
