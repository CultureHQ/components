import React, { Component } from "react";

class ClickClose extends Component {
  containerRef = React.createRef();

  componentDidMount() {
    window.addEventListener("click", this.handleClick);
  }

  componentWillUnmount() {
    window.removeEventListener("click", this.handleClick);
  }

  handleClick = event => {
    if (this.containerRef.current.contains(event.target)) {
      return;
    }

    const { onClose } = this.props;
    onClose();
  };

  render() {
    const { children, component: Container = "div", ...props } = this.props;

    return (
      <Container ref={this.containerRef} {...props}>
        {children}
      </Container>
    );
  }
}

export default ClickClose;
