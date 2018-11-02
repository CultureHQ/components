import React, { Component } from "react";

import getRotation from "../../utils/get-rotation";

const ROTATIONS = [
  {},
  { transform: "rotateY(180deg)" },
  { transform: "rotate(180deg)" },
  { transform: "rotate(180deg) rotateY(180deg)" },
  { transform: "rotate(270deg) rotateY(180deg)", transformOrigin: "top left" },
  { transform: "translateY(-100%) rotate(90deg)", transformOrigin: "bottom left" },
  {
    transform: "translateY(-100%) translateX(-100%) rotate(90deg) rotateY(180deg)",
    transformOrigin: "bottom right"
  },
  { transform: "translateX(-100%) rotate(270deg)", transformOrigin: "top right" }
];

const getStylesForRotation = (image, rotation, maxHeight) => {
  const scaledWidth = image.width / image.height * maxHeight;
  const scaledHeight = image.height / image.width * maxHeight;

  const halfWidth = (rotation >= 5 ? scaledHeight : scaledWidth) / 2;

  return {
    ...ROTATIONS[rotation - 1],
    left: `calc(50% - ${halfWidth}px)`,
    height: rotation >= 5 ? scaledHeight : maxHeight
  };
};

const setupImage = (preview, maxHeight) => {
  const image = new Image();
  image.src = typeof preview === "string" ? preview : URL.createObjectURL(preview);

  const promises = [
    getRotation(preview),
    new Promise((resolve, reject) => {
      image.onload = resolve;
      image.onerror = reject;
    })
  ];

  return Promise.all(promises).then(([rotation]) => ({
    src: image.src,
    styles: getStylesForRotation(image, rotation, maxHeight)
  }));
};

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

    setupImage(preview, maxHeight).then(({ src, styles }) => {
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
