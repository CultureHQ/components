import React, { Component } from "react";

import classnames from "../classnames";

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
    const { children, className, loading } = this.props;
    const { spinning } = this.state;

    if (!loading) {
      return <>{children}</>;
    }

    return (
      <div className={classnames("chq-ldr", className, { "chq-ldr-sp": spinning })}>
        <Spinner />
      </div>
    );
  }
}

export default Loader;
