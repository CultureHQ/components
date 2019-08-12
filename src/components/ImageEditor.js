import React, { Component } from "react";

import ActionButton from "./buttons/ActionButton";
import Button from "./buttons/Button";
import Icon from "./Icon";

const cropperToImage = cropper => {
  const type = "image/jpeg";
  const canvas = cropper.getCroppedCanvas({ fillColor: "#ffffff" });
  const binary = window.atob(canvas.toDataURL(type).split(",")[1]);

  const { length } = binary;
  const byteArray = new Uint8Array(length);

  for (let idx = 0; idx < length; idx += 1) {
    byteArray[idx] = binary.charCodeAt(idx);
  }

  return new Blob([byteArray], { type });
};

class ImageEditor extends Component {
  imageRef = React.createRef();

  componentDidMount() {
    this.componentIsMounted = true;

    const promises = [
      import("cropperjs"),
      import("cropperjs/dist/cropper.css")
    ];

    return Promise.all(promises).then(responses => {
      if (this.componentIsMounted) {
        const Cropper = responses[0].default;
        const { aspectRatio } = this.props;

        this.cropper = new Cropper(this.imageRef.current, {
          aspectRatio,
          dragMove: "move",
          autoCropArea: 1,
          responsive: true
        });
      }
    }).catch(() => {
      // this catch is largely here because in the case that you're not in an
      // environment that supports dynamic import (like jest when you're not
      // compiling vendored code) it will spam the console otherwise
    });
  }

  componentWillUnmount() {
    this.componentIsMounted = false;

    if (this.cropper) {
      this.cropper.destroy();
    }
  }

  handleRotateLeft = () => {
    this.cropper.rotate(-45);
  };

  handleRotateRight = () => {
    this.cropper.rotate(45);
  };

  handleZoomIn = () => {
    this.cropper.zoom(0.2);
  };

  handleZoomOut = () => {
    this.cropper.zoom(-0.2);
  };

  handleSave = () => {
    const { onEdit } = this.props;

    onEdit(cropperToImage(this.cropper));
  };

  render() {
    const { image, onFailure } = this.props;

    return (
      <div className="chq-ied">
        <div className="chq-ied--ctrl">
          <ActionButton
            aria-label="Rotate left"
            icon="arrow-return-left"
            onClick={this.handleRotateLeft}
          />
          <ActionButton
            aria-label="Rotate right"
            icon="arrow-return-right"
            onClick={this.handleRotateRight}
          />
          <ActionButton
            aria-label="Zoom in"
            icon="ios-plus-outline"
            onClick={this.handleZoomIn}
          />
          <ActionButton
            aria-label="Zoom out"
            icon="ios-minus-outline"
            onClick={this.handleZoomOut}
          />
          <Button primary onClick={this.handleSave}>
            <Icon icon="ios-camera-outline" /> Save
          </Button>
        </div>
        <div className="chq-ied--img">
          <img
            ref={this.imageRef}
            src={image}
            alt="Preview"
            onError={onFailure}
          />
        </div>
      </div>
    );
  }
}

ImageEditor.defaultProps = {
  aspectRatio: null
};

export default ImageEditor;
