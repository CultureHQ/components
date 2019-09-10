import * as React from "react";

import readImage from "../utils/readImage";

type ImagePreviewProps = {
  image: Blob | File | string | null;
  preview: Blob | File | string | null;
};

type ImagePreviewState = {
  src: string | null;
  styles: { [key: string]: undefined | string | number };
};

class ImagePreview extends React.Component<ImagePreviewProps, ImagePreviewState> {
  private componentIsMounted = false;

  private containerRef = React.createRef<HTMLSpanElement>();

  state = { src: null, styles: {} };

  componentDidMount() {
    this.componentIsMounted = true;

    const { preview } = this.props;

    if (preview) {
      this.enqueueLoad();
    }
  }

  componentDidUpdate(prevProps: ImagePreviewProps) {
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
    const container = this.containerRef.current;

    if (container && container.parentNode instanceof HTMLElement) {
      const { clientWidth, clientHeight } = container.parentNode;

      readImage(image, preview, clientWidth, clientHeight).then(({ src, styles }) => {
        if (this.componentIsMounted) {
          this.setState({ src, styles });
        }
      });
    }
  }

  render() {
    const { src, styles } = this.state;

    return (
      <span ref={this.containerRef}>
        {src && <img className="chq-ipv" src={src || undefined} alt="Preview" style={styles} />}
      </span>
    );
  }
}

export default ImagePreview;
