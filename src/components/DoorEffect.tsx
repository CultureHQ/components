import React from "react";

type DoorEffectProps = {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  open: boolean;
};

class DoorEffect extends React.PureComponent<DoorEffectProps, {}> {
  doorRef = React.createRef<HTMLDivElement>();

  static defaultProps = {
    duration: 150
  };

  componentDidUpdate(prevProps: DoorEffectProps) {
    const { className, duration, open } = this.props;
    const door = this.doorRef.current;

    if (door && open !== prevProps.open) {
      if (open) {
        window.requestAnimationFrame(() => door.classList.add(`${className}-open`));
      } else {
        door.classList.remove(`${className}-open`);
        window.requestAnimationFrame(() => door.classList.add(`${className}-closed`));
        window.setTimeout(() => door.classList.remove(`${className}-closed`), duration);
      }
    }
  }

  render() {
    const { children, className } = this.props;

    return (
      <div ref={this.doorRef} className={className}>
        {children}
      </div>
    );
  }
}

export default DoorEffect;
