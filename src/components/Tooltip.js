import React, { Component } from "react";

class Tooltip extends Component {
  bubble = React.createRef();

  tooltip = React.createRef();

  componentDidMount() {
    const bubble = this.bubble.current;
    const tooltip = this.tooltip.current;

    window.requestAnimationFrame(() => {
      bubble.style.visibility = "hidden";
      bubble.style.display = "table";
      bubble.style.left = `-${Math.abs((bubble.offsetWidth - tooltip.offsetWidth) / 2)}px`
      bubble.style.display = null;
      bubble.style.visibility = null;
    });
  }

  render() {
    const { children, tip } = this.props;

    return (
      <span className="chq-ttp" ref={this.tooltip}>
        {children}
        <span className="chq-ttp--bbl" ref={this.bubble}>{tip}</span>
      </span>
    );
  }
};

export default Tooltip;
