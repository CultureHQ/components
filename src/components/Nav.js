import React, { Component } from "react";
import classnames from "classnames";

class Nav extends Component {
  state = {
    navDisplayed: true,
    prevScroll: window.pageYOffset
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
      "chq-nav",
      { "chq-nav-hd": !navDisplayed },
      className
    );
  }

  handleWindowScroll = () => {
    const { prevScroll } = this.state;
    const nextScroll = window.pageYOffset;

    this.setState({
      navDisplayed: prevScroll === 0 || nextScroll <= 30 || prevScroll > nextScroll,
      prevScroll: nextScroll
    });
  };

  render() {
    const { children, className, ...props } = this.props;

    return <nav className={this.getClassList()} {...props}>{children}</nav>;
  }
}

export default Nav;
