import React, { Component, Fragment } from "react";

import Spinner from "./Spinner";

class Loader extends Component {
  state = { spinning: false };

  componentDidMount = () => {
    const { loading } = this.props;

    this.componentIsMounted = true;

    if (loading) {
      this.timeout = setTimeout(this.handleSpinnerTriggered, 250);
    }
  };

  componentWillUnmount = () => {
    this.componentIsMounted = false;

    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
  };

  handleSpinnerTriggered = () => {
    const { loading } = this.props;

    if (this.componentIsMounted && loading) {
      this.setState({ spinning: true });
    }

    this.timeout = null;
  };

  render() {
    const { loading, children } = this.props;
    const { spinning } = this.state;

    if (!loading) {
      return <Fragment>{children}</Fragment>;
    }

    if (spinning) {
      return <Spinner placeholder />;
    }

    return null;
  }
}

export default Loader;
