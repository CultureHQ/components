import React, { Component } from "react";

class Icon extends Component {
  state = { d: null };

  componentDidMount() {
    this.componentIsMounted = true;
    return this.loadIcon();
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
    return import(/* webpackChunkName: "icons" */ "../icons.json").then(paths => {
      const { icon } = this.props;

      if (this.componentIsMounted) {
        this.setState({ d: paths[icon].join(" ") });
      }
    });
  }

  render() {
    const { className } = this.props;
    const { d } = this.state;

    return (
      <svg width="22px" height="22px" viewBox="0 0 1024 1024" className={className}>
        {d && <path d={d} />}
      </svg>
    );
  }
}

export default Icon;
