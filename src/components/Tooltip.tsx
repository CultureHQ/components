import React from "react";

type TooltipProps = {
  children: React.ReactNode;
  tip: string;
};

class Tooltip extends React.Component<TooltipProps, Record<string, unknown>> {
  private bubble = React.createRef<HTMLSpanElement>();

  private frame: null | ReturnType<typeof window.requestAnimationFrame> = null;

  private timeout: null | number = null;

  private tooltip = React.createRef<HTMLSpanElement>();

  private triangle = React.createRef<HTMLSpanElement>();

  componentDidMount(): void {
    this.requestComputeOffsets();

    window.addEventListener("resize", this.recomputeOffsets);
  }

  componentDidUpdate(prevProps: TooltipProps): void {
    const { tip } = this.props;

    if (tip !== prevProps.tip) {
      this.requestComputeOffsets();
    }
  }

  componentWillUnmount(): void {
    window.removeEventListener("resize", this.recomputeOffsets);

    if (this.frame) {
      window.cancelAnimationFrame(this.frame);
    }

    if (this.timeout) {
      window.clearTimeout(this.timeout);
    }
  }

  computeOffsets = (): void => {
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

    Object.assign(bubble.style, {
      left: `${bubbleOffset}px`,
      display: null,
      visibility: null
    });

    this.frame = null;
  };

  recomputeOffsets = (): void => {
    if (this.timeout) {
      window.clearTimeout(this.timeout);
    }

    this.timeout = window.setTimeout(this.requestComputeOffsets, 1000);
  };

  requestComputeOffsets = (): void => {
    this.frame = window.requestAnimationFrame(this.computeOffsets);
    this.timeout = null;
  };

  render(): React.ReactElement {
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
