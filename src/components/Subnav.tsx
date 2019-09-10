import * as React from "react";

import classnames from "../classnames";

type SubnavItemProps = {
  active?: boolean;
  children: React.ReactNode;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const SubnavItem = ({ active, children, className, onClick }: SubnavItemProps) => (
  <button
    type="button"
    aria-current={active}
    className={classnames("chq-snv--it", className)}
    onClick={onClick}
  >
    {children}
  </button>
);

type SubnavProps = {
  activeIndex?: number;
  children: React.ReactElement<SubnavItemProps>[];
  className?: string;
  onChange: (index: number) => void;
};

type SubnavState = {
  activeIndex: number;
};

class Subnav extends React.Component<SubnavProps, SubnavState> {
  static Item = SubnavItem;

  constructor(props: SubnavProps) {
    super(props);

    this.state = { activeIndex: props.activeIndex || 0 };
  }

  componentDidUpdate(prevProps: SubnavProps, prevState: SubnavState) {
    const { onChange } = this.props;
    const { activeIndex } = this.state;

    if (onChange && (prevState.activeIndex !== activeIndex)) {
      onChange(activeIndex);
    }
  }

  render() {
    const { children, className, activeIndex: givenIndex } = this.props;
    const { activeIndex: currentIndex } = this.state;

    const activeIndex = typeof givenIndex === "number" ? givenIndex : currentIndex;

    return (
      <nav className={classnames(className, "chq-snv")}>
        {React.Children.map(children, (child, index) => (
          React.cloneElement(child, {
            active: index === activeIndex,
            onClick: () => this.setState({ activeIndex: index })
          })
        ))}
      </nav>
    );
  }
}

export default Subnav;
