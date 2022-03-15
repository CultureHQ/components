import React from "react";

import readImage from "../utils/readImage";

type ImagePreviewProps = {
  editorOpen?: boolean;
  image: Blob | File | string | null;
  imageAsBackground?: boolean;
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

  componentDidMount(): void {
    this.componentIsMounted = true;

    const { preview } = this.props;

    if (preview) {
      this.enqueueLoad();
    }
  }

  componentDidUpdate(prevProps: ImagePreviewProps): void {
    const { preview } = this.props;

    if (preview && (preview !== prevProps.preview)) {
      this.enqueueLoad();
    }
  }

  componentWillUnmount(): void {
    this.componentIsMounted = false;
  }

  enqueueLoad(): void {
    const { image, imageAsBackground, preview } = this.props;

    const container = this.containerRef.current;

    if (container && container.parentNode instanceof HTMLElement) {
      const { clientWidth, clientHeight } = container.parentNode;

      readImage(image, preview, clientWidth, clientHeight).then(({ src, styles }) => {
        if (this.componentIsMounted) {
          if (imageAsBackground) {
            this.setState({ src, styles: { ...styles, width: "auto", height: "auto", margin: "0 auto", maxWidth: "100%", maxHeight: "100%" } });
          } else {
            this.setState({ src, styles });
          }
        }
      }).catch(_error => {
        this.setState({
          src: "https://images.unsplash.com/photo-1605827170202-169d05c841d5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1490&q=80",
          styles: { width: "auto", height: "auto", margin: "0 auto", maxWidth: "100%", maxHeight: "100%" }
        });
      });
    }
  }

  render(): React.ReactElement {
    const { src, styles } = this.state;
    const { editorOpen, imageAsBackground } = this.props;

    return (
      <span ref={this.containerRef} style={imageAsBackground ? { alignItems: "center", display: "flex", justifyContent: "center" } : {}}>
        {src && !editorOpen && <img className="chq-ipv" src={src || undefined} alt="Preview" style={styles} />}
      </span>
    );
  }
}

export default ImagePreview;
