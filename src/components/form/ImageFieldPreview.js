import React, { Component } from "react";

import readImage from "../../utils/read-image";

class ImageFieldPreview extends Component {
  imageRef = React.createRef();

  state = { src: null, styles: {} };

  componentDidMount() {
    this.componentIsMounted = true;
    this.enqueueLoad();
  }

  componentDidUpdate(prevProps) {
    const { preview } = this.props;
    const { src } = this.state;

    if (preview !== prevProps.preview) {
      this.enqueueLoad();
    }
  }

  componentWillUnmount() {
    this.componentIsMounted = false;
  }

  enqueueLoad() {
    const { image, preview } = this.props;

    if (!preview) {
      return Promise.resolve();
    }

    const imageTag = this.imageRef.current;
    const maxHeight = imageTag ? imageTag.parentNode.clientHeight : 198;

    return readImage(image, preview, maxHeight).then(({ src, styles }) => {
      if (this.componentIsMounted) {
        this.setState({ src, styles });
      }
    });
  }

  render() {
    const { src, styles } = this.state;

    if (!src) {
      return null;
    }

    return (
      <img
        ref={this.imageRef}
        className="chq-ffd--im--pv"
        src={src}
        alt="Preview"
        style={styles}
      />
    );
  }
}

export default ImageFieldPreview;
