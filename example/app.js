import React from "react";
import ReactDOM from "react-dom";

import { Warning } from "../src";

const App = () => (
  <div>
    <h1>{"<"}Warning{">"}</h1>
    <Warning>This is a warning.</Warning>
  </div>
);

ReactDOM.render(<App />, document.getElementById("main"));
