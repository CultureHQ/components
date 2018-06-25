import React, { Component } from "react";

class AsyncPath extends Component {
  constructor(props) {
    super(props);

    this.state = { d: null };
  }

  componentDidMount() {
    this.componentIsMounted = true;
    return this.loadIcon();
  }

  componentDidUpdate({ icon }) {
    if (icon !== this.props.icon) {
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
    const { d } = this.state;
    return d ? <path d={d} /> : null;
  }
}

const Icon = ({ icon, ...props }) => (
  <svg width="22px" height="22px" viewBox="0 0 1024 1024" {...props}>
    <AsyncPath icon={icon} />
  </svg>
);

export { AsyncPath };
export default Icon;
