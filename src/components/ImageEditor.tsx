import React from "react";
import Cropper from "cropperjs";

import ActionButton from "./buttons/ActionButton";
import Button from "./buttons/Button";
import Icon from "./Icon";

const cropperToImage = (cropper: Cropper) => {
  const type = "image/png";
  const canvas = cropper.getCroppedCanvas({
    imageSmoothingEnabled: true,
    imageSmoothingQuality: "high"
  });
  const binary = window.atob(canvas.toDataURL(type, 1).split(",")[1]);

  const { length } = binary;
  const byteArray = new Uint8Array(length);

  for (let idx = 0; idx < length; idx += 1) {
    byteArray[idx] = binary.charCodeAt(idx);
  }

  return new Blob([byteArray], { type });
};

type ImageEditorProps = {
  aspectRatio?: number;
  image: string | null;
  onEdit?: (blob: Blob, closeModal: boolean) => void;
  onFailure?: () => void;
};

class ImageEditor extends React.Component<ImageEditorProps, Record<string, unknown>> {
  private cropper: null | Cropper = null;

  private componentIsMounted = false;

  private imageRef = React.createRef<HTMLImageElement>();

  componentDidMount(): void {
    this.componentIsMounted = true;

    import("./Cropper")
      .then(module => {
        const image = this.imageRef.current;

        if (this.componentIsMounted && image) {
          const { aspectRatio } = this.props;
          const ImageCropper = module.default;

          this.cropper = new ImageCropper(image, {
            aspectRatio,
            dragMode: "move",
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

  componentWillUnmount(): void {
    this.componentIsMounted = false;

    // We have this here to ensure the image will be cropped even if the user
    // closes the modal.
    this.handleSave();

    if (this.cropper) {
      this.cropper.destroy();
    }
  }

  handleRotateLeft = (): void => {
    if (this.cropper) {
      this.cropper.rotate(-45);
    }
  };

  handleRotateRight = (): void => {
    if (this.cropper) {
      this.cropper.rotate(45);
    }
  };

  handleZoomIn = (): void => {
    if (this.cropper) {
      this.cropper.zoom(0.2);
    }
  };

  handleZoomOut = (): void => {
    if (this.cropper) {
      this.cropper.zoom(-0.2);
    }
  };

  handleSave = (closeModal = false): void => {
    const { onEdit } = this.props;

    if (onEdit && this.cropper) {
      onEdit(cropperToImage(this.cropper), closeModal);
    }
  };

  render(): React.ReactElement {
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
          <Button primary onClick={() => this.handleSave(true)}>
            <Icon icon="ios-camera-outline" /> Save
          </Button>
        </div>
        <div className="chq-ied--img">
          <img
            ref={this.imageRef}
            src={image || undefined}
            alt="Preview"
            onError={onFailure}
          />
        </div>
      </div>
    );
  }
}

export default ImageEditor;
