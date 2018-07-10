import React, { Component } from "react";
import classnames from "classnames";

class Subnav extends Component {
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
    const {
      children,
      className,
      activeIndex: givenIndex,
      onChange,
      ...props
    } = this.props;

    const { activeIndex: currentIndex } = this.state;

    const activeIndex = Number.isInteger(givenIndex) ? givenIndex : currentIndex;

    return (
      <nav className={classnames(className, "chq-snv")} {...props}>
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

Subnav.Item = ({
  children, className, active, ...props
}) => (
  <a
    className={
      classnames(className, "chq-snv--it", { "chq-snv--it-active": active })
    }
    {...props}
  >
    {children}
  </a>
);

export default Subnav;
