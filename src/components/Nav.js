import React, { Component } from "react";
import classnames from "classnames";

class Nav extends Component {
  state = {
    navDisplayed: true,
    prevScroll: 0
  };

  componentDidMount() {
    window.addEventListener("scroll", this.handleWindowScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleWindowScroll);
  }

  getClassList() {
    const { className } = this.props;
    const { navDisplayed } = this.state;

    return classnames(
      className,
      "chq-nav",
      { "chq-nav-hd": !navDisplayed }
    );
  }

  handleWindowScroll = () => {
    const { prevScroll } = this.state;
    const nextScroll = window.pageYOffset;

    if (nextScroll <= 30 || prevScroll > nextScroll) {
      this.setState({ navDisplayed: true });
    } else {
      this.setState({ navDisplayed: false });
    }

    this.setState({ prevScroll: nextScroll });
  };

  render() {
    const { children, ...props } = this.props;

    return <nav className={this.getClassList()} {...props}>{children}</nav>;
  }
}

export default Nav;
