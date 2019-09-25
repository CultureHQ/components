import React from "react";

type TooltipProps = {
  children: React.ReactNode;
  tip: string;
};

class Tooltip extends React.Component<TooltipProps, {}> {
  private bubble = React.createRef<HTMLSpanElement>();

  private frame: null | ReturnType<typeof window.requestAnimationFrame> = null;

  private timeout: null | number = null;

  private tooltip = React.createRef<HTMLSpanElement>();

  private triangle = React.createRef<HTMLSpanElement>();

  componentDidMount() {
    this.requestComputeOffsets();

    window.addEventListener("resize", this.recomputeOffsets);
  }

  componentDidUpdate(prevProps: TooltipProps) {
    const { tip } = this.props;

    if (tip !== prevProps.tip) {
      this.requestComputeOffsets();
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.recomputeOffsets);

    if (this.frame) {
      window.cancelAnimationFrame(this.frame);
    }

    if (this.timeout) {
      window.clearTimeout(this.timeout);
    }
  }

  computeOffsets = () => {
    const bubble = this.bubble.current;
    const tooltip = this.tooltip.current;
    const triangle = this.triangle.current;

    // In the case that this component is not mounted, it can get into a state
    // where the refs are invalid.
    if (!bubble || !tooltip || !triangle) {
      return;
    }

    bubble.style.visibility = "hidden";
    bubble.style.display = "table";

    let bubbleOffset = -Math.abs((bubble.offsetWidth - tooltip.offsetWidth) / 2);

    if ((bubble.offsetWidth / 2) > tooltip.offsetLeft) {
      bubbleOffset = 10 - tooltip.offsetLeft;

      const triangleMiddle = (tooltip.offsetWidth - triangle.offsetWidth) / 2;
      triangle.style.left = `${tooltip.offsetLeft - 10 + triangleMiddle}px`;
    }

    bubble.style.left = `${bubbleOffset}px`;
    bubble.style.display = null;
    bubble.style.visibility = null;

    this.frame = null;
  };

  recomputeOffsets = () => {
    if (this.timeout) {
      window.clearTimeout(this.timeout);
    }

    this.timeout = window.setTimeout(this.requestComputeOffsets, 1000);
  };

  requestComputeOffsets = () => {
    this.frame = window.requestAnimationFrame(this.computeOffsets);
    this.timeout = null;
  };

  render() {
    const { children, tip } = this.props;

    return (
      <span className="chq-ttp" ref={this.tooltip}>
        {children}
        <span className="chq-ttp--bbl" ref={this.bubble}>
          {tip}
          <span className="chq-ttp--tri" ref={this.triangle} />
        </span>
      </span>
    );
  }
}

export default Tooltip;
