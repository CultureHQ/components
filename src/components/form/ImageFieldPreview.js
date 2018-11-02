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
      URL.revokeObjectURL(src);
      this.enqueueLoad();
    }
  }

  componentWillUnmount() {
    const { src } = this.state;

    this.componentIsMounted = false;
    URL.revokeObjectURL(src);
  }

  enqueueLoad() {
    const { preview } = this.props;

    if (!preview) {
      return;
    }

    const imageTag = this.imageRef.current;
    const maxHeight = imageTag ? imageTag.parentNode.clientHeight : 198;

    readImage(preview, maxHeight).then(({ src, styles }) => {
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
