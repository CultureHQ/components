import React from "react";
import Cropper from "cropperjs";

import ActionButton from "./buttons/ActionButton";
import Button from "./buttons/Button";
import Icon from "./Icon";
import Loader from "./Loader";

const resizeImage = (image: HTMLCanvasElement, maxWidth: number, maxHeight: number): Promise<string> => {
  return new Promise((resolve, _reject) => {
    const canvas = document.createElement('canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    const width = image.width;
    const height = image.height;

    let newWidth = width;
    let newHeight = height;

    if (width > height) {
      if (width > maxWidth) {
        newHeight *= maxWidth / width;
        newWidth = maxWidth;
      }
    } else {
      if (height > maxHeight) {
        newWidth *= maxHeight / height;
        newHeight = maxHeight;
      }
    }

    canvas.width = newWidth;
    canvas.height = newHeight;

    ctx?.drawImage(image, 0, 0, newWidth, newHeight);

    resolve(canvas.toDataURL('image/png'));
  });
};

const cropperToImage = async (cropper: Cropper): Promise<Blob> => {
  const type = "image/png";
  const canvas = cropper.getCroppedCanvas({
    imageSmoothingEnabled: true,
    imageSmoothingQuality: "high"
  });

  // Resize image to a maximum of 1024x1024
  const resizedDataUrl = await resizeImage(canvas, 2880, 2880);
  const binary = window.atob(resizedDataUrl.split(",")[1]);

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
  clickOutsideCancel?: boolean;
};

type ImageEditorState = {
  isLoading: boolean;
};

class ImageEditor extends React.Component<ImageEditorProps, ImageEditorState,
Record<string, unknown>> {
  private cropper: null | Cropper = null;

  private buttonSaveRef = React.createRef<HTMLButtonElement>();

  private componentIsMounted = false;

  private imageRef = React.createRef<HTMLImageElement>();

  private isSaveClicked = false;

  constructor(props: ImageEditorProps) {
    super(props);

    this.state = {
      isLoading: true
    };
  }

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
            responsive: true,
            ready: () => {
              this.setState({ isLoading: false });
            }
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
    const { clickOutsideCancel } = this.props;
    if (!clickOutsideCancel || this.isSaveClicked) {
      this.handleSave();
    }
    if (this.cropper) {
      this.cropper.destroy();
    }
  }

  editSaveText = async (): Promise<void> => {
    const { onEdit } = this.props;
    const saveButtonRef = this.buttonSaveRef.current;
    if (saveButtonRef) {
      saveButtonRef.innerText = "Saving...";
      saveButtonRef.disabled = true;

      this.isSaveClicked = true;

      if (onEdit && this.cropper) {
        try {
          const croppedImageBlob: Blob = await cropperToImage(this.cropper);
          onEdit(croppedImageBlob, true);
        } catch (error) {
          saveButtonRef.innerText = "Save";
          saveButtonRef.disabled = false;
          this.isSaveClicked = false;
        }
      }
    }
  };

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

  handleSave = async (closeModal = false): Promise<void> => {
    const { onEdit } = this.props;
    if (onEdit && this.cropper) {
      const croppedImageBlob: Blob = await cropperToImage(this.cropper);
      onEdit(croppedImageBlob, closeModal);
    }
  };

  render(): React.ReactElement {
    const { image, onFailure } = this.props;
    const { isLoading } = this.state;
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
          <Button
            ref={this.buttonSaveRef}
            primary
            onClick={this.editSaveText}
            disabled={isLoading}
          >
            <Icon icon="ios-camera-outline" /> Save
          </Button>
        </div>
        <div className="chq-ied--img">
          {isLoading
          && (
            <Loader loading />
          )}
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
