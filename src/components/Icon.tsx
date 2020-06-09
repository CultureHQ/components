import React from "react";

import * as iconPaths from "../icons.json";

export type IconName = keyof typeof iconPaths;

type IconProps = {
  className?: string;
  icon: IconName;
};

type IconState = {
  path: null | string;
};

class Icon extends React.PureComponent<IconProps, IconState> {
  private componentIsMounted = false;

  state: IconState = { path: null };

  componentDidMount() {
    this.componentIsMounted = true;
    this.fetchPath();
  }

  componentDidUpdate(prevProps: IconProps) {
    const { icon } = this.props;

    if (icon !== prevProps.icon) {
      this.fetchPath();
    }
  }

  componentWillUnmount() {
    this.componentIsMounted = false;
  }

  fetchPath() {
    const { icon } = this.props;
    console.log(icon);

    import("../icons.json")
      .then(icons => {
        if (this.componentIsMounted) {
          this.setState({ path: icons[icon].join(" ") });
        }
      })
      .catch(() => {
        // this catch is largely here because in the case that you're not in
        // an environment that supports dynamic import (like jest when you're
        // not compiling vendored code) it will spam the console otherwise
      });
  }

  render() {
    const { className } = this.props;
    const { path } = this.state;

    return (
      <svg
        aria-hidden
        role="presentation"
        width="22px"
        height="22px"
        viewBox="0 0 1024 1024"
        className={className}
      >
        {path && <path d={path} />}
      </svg>
    );
  }
}

export default Icon;
