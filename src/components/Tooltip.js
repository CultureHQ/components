import React, { Component } from "react";

const bubbleOffset = ({ tooltip, bubble }) => {
  if ((bubble.offsetWidth / 2) > tooltip.offsetLeft) {
    return `${(10 - tooltip.offsetLeft)}px`;
  }
  return `${-Math.abs((bubble.offsetWidth - tooltip.offsetWidth) / 2)}px`;
};

const triangleOffset = ({ tooltip, bubble, triangle }) => {
  if ((bubble.offsetWidth / 2) > tooltip.offsetLeft) {
    return `${tooltip.offsetLeft - 10 + ((tooltip.offsetWidth - triangle.offsetWidth) / 2)}px`;
  }
  return null;
};

class Tooltip extends Component {
  bubble = React.createRef();

  tooltip = React.createRef();

  triangle = React.createRef();

  componentDidMount() {
    const bubbleStyle = this.bubble.current.style;
    const components = {
      bubble: this.bubble.current,
      tooltip: this.tooltip.current,
      triangle: this.triangle.current
    };

    window.requestAnimationFrame(() => {
      bubbleStyle.visibility = "hidden";
      bubbleStyle.display = "table";

      bubbleStyle.left = bubbleOffset(components);
      this.triangle.current.style.left = triangleOffset(components);

      bubbleStyle.display = null;
      bubbleStyle.visibility = null;
    });
  }

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
};

export default Tooltip;
