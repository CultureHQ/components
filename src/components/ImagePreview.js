import React, { Component } from "react";

import readImage from "../utils/readImage";

class ImagePreview extends Component {
  containerRef = React.createRef();

  state = { src: null, styles: {} };

  componentDidMount() {
    this.componentIsMounted = true;

    const { preview } = this.props;

    if (preview) {
      this.enqueueLoad();
    }
  }

  componentDidUpdate(prevProps) {
    const { preview } = this.props;

    if (preview && (preview !== prevProps.preview)) {
      this.enqueueLoad();
    }
  }

  componentWillUnmount() {
    this.componentIsMounted = false;
  }

  enqueueLoad() {
    const { image, preview } = this.props;
    const { clientWidth, clientHeight } = this.containerRef.current.parentNode;

    return readImage(image, preview, clientWidth, clientHeight).then(({ src, styles }) => {
      if (this.componentIsMounted) {
        this.setState({ src, styles });
      }
    });
  }

  render() {
    const { src, styles } = this.state;

    return (
      <span ref={this.containerRef}>
        {src && <img className="chq-ipv" src={src} alt="Preview" style={styles} />}
      </span>
    );
  }
}

export default ImagePreview;
