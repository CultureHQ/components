import React, { Component } from "react";

import Button from "./buttons/Button";
import PlainButton from "./buttons/PlainButton";
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

    return Promise.all(promises).then(([{ default: Cropper }]) => {
      if (this.componentIsMounted) {
        this.cropper = new Cropper(this.imageRef.current, {
          dragMove: "move",
          autoCropArea: 1,
          responsive: true
        });

        document.addEventListener("keydown", this.handleKeyPressed);
      }
    }).catch(() => {
      // this catch is largely here because in the case that you're not in an
      // environment that supports dynamic import (like jest when you're not
      // compiling vendored code) it will spam the console otherwise
    });
  }

  componentWillUnmount() {
    this.componentIsMounted = false;

    document.removeEventListener("keydown", this.handleEnterPressed);

    if (this.cropper) {
      this.cropper.destroy();
    }
  }

  handleKeyPressed = event => {
    if (event.key === "Enter") {
      event.preventDefault();
      event.stopPropagation();
      this.handleSave();
    }
  };

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
          <PlainButton aria-label="Rotate left" onClick={this.handleRotateLeft}>
            <Icon icon="arrow-return-left" />
          </PlainButton>
          <PlainButton aria-label="Rotate right" onClick={this.handleRotateRight}>
            <Icon icon="arrow-return-right" />
          </PlainButton>
          <PlainButton aria-label="Zoom in" onClick={this.handleZoomIn}>
            <Icon icon="ios-plus-outline" />
          </PlainButton>
          <PlainButton aria-label="Zoom out" onClick={this.handleZoomOut}>
            <Icon icon="ios-minus-outline" />
          </PlainButton>
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

export default ImageEditor;
