import React from "react";

import classnames from "../classnames";

import Spinner from "./Spinner";

type LoaderProps = {
  children?: React.ReactNode;
  className?: string;
  loading: boolean;
};

type LoaderState = {
  spinning: boolean;
};

class Loader extends React.Component<LoaderProps, LoaderState> {
  private componentIsMounted = false;

  private timeout: null | number = null;

  state = { spinning: false };

  componentDidMount(): void {
    const { loading } = this.props;

    this.componentIsMounted = true;

    if (loading) {
      this.timeout = window.setTimeout(this.handleSpinnerTriggered, 250);
    }
  }

  componentWillUnmount(): void {
    this.componentIsMounted = false;

    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
  }

  handleSpinnerTriggered = (): void => {
    const { loading } = this.props;

    if (this.componentIsMounted && loading) {
      this.setState({ spinning: true });
    }

    this.timeout = null;
  };

  render(): React.ReactElement {
    const { children, className, loading } = this.props;
    const { spinning } = this.state;

    if (!loading) {
      return <>{children}</>;
    }

    return (
      <div className={classnames("chq-ldr", className)}>
        <Spinner aria-hidden={!spinning} />
      </div>
    );
  }
}

export default Loader;
