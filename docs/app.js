import React, { StrictMode, Suspense, lazy } from "react";
import ReactDOM from "react-dom";

const App = lazy(() => import(/* webpackChunkName: "app" */ "./Components"));

const AsyncApp = () => (
  <StrictMode>
    <Suspense fallback={<div />}>
      <App />
    </Suspense>
  </StrictMode>
);

ReactDOM.render(<AsyncApp />, document.getElementById("main"));
