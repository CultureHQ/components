import React, { PureComponent } from "react";

class DoorEffect extends PureComponent {
  static defaultProps = {
    duration: 150,
    open: false,
    tag: "div"
  };

  doorRef = React.createRef();

  componentDidUpdate(prevProps) {
    const { className, duration, open } = this.props;

    if (open !== prevProps.open) {
      const { classList } = this.doorRef.current;

      if (open) {
        window.requestAnimationFrame(() => classList.add(`${className}-open`));
      } else {
        classList.remove(`${className}-open`);
        window.requestAnimationFrame(() => classList.add(`${className}-closed`));

        setTimeout(() => classList.remove(`${className}-closed`), duration);
      }
    }
  }

  render() {
    const { children, className, tag: Tag } = this.props;

    return (
      <Tag ref={this.doorRef} className={className}>
        {children}
      </Tag>
    );
  }
}

export default DoorEffect;
