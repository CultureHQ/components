import * as React from "react";

import classnames from "../classnames";
import { HTMLContainerProps } from "../typings";

import Spinner from "./Spinner";

type LoaderProps = HTMLContainerProps & {
  loading: boolean;
};

type LoaderState = {
  spinning: boolean;
};

class Loader extends React.Component<LoaderProps, LoaderState> {
  private componentIsMounted: boolean;
  private timeout: null | ReturnType<typeof setTimeout>;

  constructor(props: LoaderProps) {
    super(props);

    this.componentIsMounted = false;
    this.timeout = null;

    this.state = { spinning: false };
  }

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
      <div className={classnames("chq-ldr", className)}>
        <Spinner aria-hidden={!spinning} />
      </div>
    );
  }
}

export default Loader;
