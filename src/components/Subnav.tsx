import React from "react";

import classnames from "../classnames";

type SubnavItemProps = {
  active?: boolean;
  children: React.ReactNode;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const SubnavItem: React.FC<SubnavItemProps> = ({ active, children, className, onClick }) => (
  <button
    role="tab"
    type="button"
    aria-current={active}
    aria-selected={active}
    className={classnames("chq-snv--it", className)}
    onClick={onClick}
  >
    {children}
  </button>
);

type SubnavProps = {
  activeIndex?: number;
  ariaLabel?: string;
  children: React.ReactElement<SubnavItemProps>[];
  className?: string;
  onChange: (index: number) => void;
};

type SubnavState = {
  activeIndex: number;
};

class Subnav extends React.Component<SubnavProps, SubnavState> {
  constructor(props: SubnavProps) {
    super(props);

    this.state = { activeIndex: props.activeIndex || 0 };
  }

  componentDidUpdate(prevProps: SubnavProps, prevState: SubnavState): void {
    const { onChange } = this.props;
    const { activeIndex } = this.state;

    if (onChange && (prevState.activeIndex !== activeIndex)) {
      onChange(activeIndex);
    }
  }

  static Item = SubnavItem;

  render(): React.ReactElement {
    const { children, className, activeIndex: givenIndex, ariaLabel } = this.props;
    const { activeIndex: currentIndex } = this.state;

    const activeIndex = typeof givenIndex === "number" ? givenIndex : currentIndex;

    return (
      <div role="tablist" aria-label={ariaLabel} className={classnames(className, "chq-snv")}>
        {React.Children.map(children, (child, index) => (
          React.cloneElement(child, {
            active: index === activeIndex,
            onClick: () => this.setState({ activeIndex: index })
          })
        ))}
      </div>
    );
  }
}

export default Subnav;
