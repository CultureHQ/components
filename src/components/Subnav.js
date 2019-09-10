import React, { Component } from "react";

import classnames from "../classnames";

const SubnavItem = ({ children, className, active, onClick }) => (
  <button
    type="button"
    aria-current={active}
    className={classnames("chq-snv--it", className)}
    onClick={onClick}
  >
    {children}
  </button>
);

class Subnav extends Component {
  static Item = SubnavItem;

  constructor(props) {
    super(props);

    this.state = { activeIndex: props.activeIndex || 0 };
  }

  componentDidUpdate(prevProps, prevState) {
    const { onChange } = this.props;
    const { activeIndex } = this.state;

    if (onChange && (prevState.activeIndex !== activeIndex)) {
      onChange(activeIndex);
    }
  }

  handleClick(activeIndex) {
    this.setState({ activeIndex });
  }

  render() {
    const { children, className, activeIndex: givenIndex } = this.props;
    const { activeIndex: currentIndex } = this.state;

    const activeIndex = Number.isInteger(givenIndex) ? givenIndex : currentIndex;

    return (
      <nav className={classnames(className, "chq-snv")}>
        {React.Children.map(children, (child, index) => (
          React.cloneElement(child, {
            active: index === activeIndex,
            onClick: () => this.handleClick(index)
          })
        ))}
      </nav>
    );
  }
}

export default Subnav;
