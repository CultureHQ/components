import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom";

const App = lazy(() => import(/* webpackChunkName: "app" */ "./components"));

const AsyncApp = () => (
  <Suspense fallback={<div />}>
    <App />
  </Suspense>
);

ReactDOM.render(<AsyncApp />, document.getElementById("main"));
