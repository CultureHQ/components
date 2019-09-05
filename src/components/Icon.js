import React, { Component } from "react";

class Icon extends Component {
  state = { d: null };

  componentDidMount() {
    this.componentIsMounted = true;
    this.loadIcon();
  }

  componentDidUpdate({ icon }) {
    const { icon: prevIcon } = this.props;

    if (icon !== prevIcon) {
      this.loadIcon();
    }
  }

  componentWillUnmount() {
    this.componentIsMounted = false;
  }

  loadIcon() {
    import("../icons.json").then(paths => {
      const { icon } = this.props;

      if (this.componentIsMounted) {
        this.setState({ d: paths[icon].join(" ") });
      }
    }).catch(() => {
      // this catch is largely here because in the case that you're not in an
      // environment that supports dynamic import (like jest when you're not
      // compiling vendored code) it will spam the console otherwise
    });
  }

  render() {
    const { className } = this.props;
    const { d } = this.state;

    return (
      <svg
        aria-hidden
        role="presentation"
        width="22px"
        height="22px"
        viewBox="0 0 1024 1024"
        className={className}
      >
        {d && <path d={d} />}
      </svg>
    );
  }
}

export default Icon;
