import React, { Component } from "react";
import classnames from "classnames";

class Subnav extends Component {
  constructor(props) {
    super(props);

    this.state = { activeIndex: props.activeIndex || 0 };
  }

  handleClick(activeIndex) {
    this.setState(prevState => {
      if (prevState.activeIndex !== activeIndex) {
        if (this.props.onChange) {
          this.props.onChange(activeIndex);
        }

        return { activeIndex };
      }
      return null;
    });
  }

  render() {
    const {
      children, className, onChange, ...props
    } = this.props;
    const { activeIndex } = this.state;

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
