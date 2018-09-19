import React, { Component } from "react";

class Tooltip extends Component {
  bubble = React.createRef();

  tooltip = React.createRef();

  triangle = React.createRef();

  componentDidMount() {
    this.requestComputeOffsets();
    window.addEventListener("resize", this.recomputeOffsets);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.recomputeOffsets);
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
  };

  recomputeOffsets = () => {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    this.timeout = setTimeout(this.requestComputeOffsets, 1000);
  };

  requestComputeOffsets = () => {
    window.requestAnimationFrame(this.computeOffsets);
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
