import React, { Component } from "react";
import ReactDOM from "react-dom";

class AsyncApp extends Component {
  state = { App: null };

  componentDidMount() {
    import(/* webpackChunkName: "app" */ "./components/App").then(module => {
      this.setState({ App: module.default });
    });
  }

  render() {
    const { App } = this.state;

    return App ? <App /> : null;
  }
}

ReactDOM.render(<AsyncApp />, document.getElementById("main"));
