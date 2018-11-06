import React, { PureComponent } from "react";

import readImage from "../../utils/read-image";

class ImageFieldPreview extends PureComponent {
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
    const maxHeight = this.containerRef.current.parentNode.clientHeight;

    return readImage(image, preview, maxHeight).then(({ src, styles }) => {
      if (this.componentIsMounted) {
        this.setState({ src, styles });
      }
    });
  }

  render() {
    const { src, styles } = this.state;

    return (
      <span ref={this.containerRef}>
        {src && <img className="chq-ffd--im--pv" src={src} alt="Preview" style={styles} />}
      </span>
    );
  }
}

export default ImageFieldPreview;
