import React from "react";

import classnames from "../../classnames";
import Icon from "../Icon";
import ModalDialog from "../modals/ModalDialog";
import ImageEditor from "../ImageEditor";
import ImagePreview from "../ImagePreview";
import FormError from "./FormError";
import { FormState, withForm } from "./Form";
import { FormFieldError } from "./typings";

export type ImageFieldValue = Blob | File | string | null;

type HijackedProps = "className" | "name" | "onChange" | "required" | "value";
type ImageFieldProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, HijackedProps> & {
  aspectRatio?: number;
  autoFocus?: boolean;
  imageAsBackground?: boolean;
  buttonLabel?: string;
  children: React.ReactNode;
  className?: string;
  name: string;
  onChange?: (value: ImageFieldValue) => void;
  progress?: number;
  required?: boolean;
  validator?: (value: ImageFieldValue) => FormFieldError;
  value?: ImageFieldValue;
  asButtonView?: boolean
};

type ImageFieldState = {
  editorOpen: boolean;
  dragging: boolean;
  failed: boolean;
  image: ImageFieldValue;
  preview: string | null;
  touched: boolean;
};

type ImageSelectedOptions = {
  editorOpen: boolean;
  failed: boolean;
  image: ImageFieldValue;
};

class ImageField extends React.Component<ImageFieldProps & FormState, ImageFieldState> {
  inputRef = React.createRef<HTMLInputElement>();

  state = {
    dragging: false,
    editorOpen: false,
    failed: false,
    image: null,
    preview: null,
    touched: false
  };

  componentDidMount() {
    const { autoFocus } = this.props;
    const input = this.inputRef.current;

    if (autoFocus && input) {
      input.focus();
    }
  }

  handleFileSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    const image = files && files[0];

    this.handleImageSelected({ editorOpen: !!image, failed: false, image: image || null });
  };

  handleImageEdited = (image: Blob) => {
    this.handleImageSelected({ editorOpen: false, failed: false, image });
  };

  handleImageFailure = () => {
    this.handleImageSelected({ editorOpen: false, failed: true, image: null });
  };

  handleImageSelected = ({ editorOpen, failed, image }: ImageSelectedOptions) => {
    const { name, onChange, onFormChange } = this.props;

    this.setState(state => {
      if (state.preview) {
        URL.revokeObjectURL(state.preview);
      }

      return {
        editorOpen,
        failed,
        image,
        preview: image ? URL.createObjectURL(image) : null,
        touched: true
      };
    });

    if (onChange) {
      onChange(image);
    }

    onFormChange(name, image);
  };

  handleClose = () => {
    this.setState({ editorOpen: false });
  };

  handleDragEnter = () => {
    this.setState({ dragging: true });
  };

  handleDragLeave = () => {
    this.setState({ dragging: false });
  };

  handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    return false;
  };

  handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    const image = event.dataTransfer.files[0];
    this.handleImageSelected({ editorOpen: !!image, failed: false, image: image || null });
  };

  render() {
    const {
      aspectRatio, autoFocus, imageAsBackground, buttonLabel, children, className,
      disabledStates, errors, name, onChange, onError, onFieldDisabledChange, asButtonView,
      onFormChange, progress, required, submitted, submitting, validator, value, values, ...props
    } = this.props;

    const { dragging, editorOpen, failed, image, preview, touched } = this.state;

    const normal = value || (values[name] as ImageFieldValue | undefined) || null;

    if (asButtonView) {
      return (
        <label className={classnames("chq-ffd", className, imageAsBackground && "chq-ffd--bg-img")} htmlFor={name}>
          <div
            className="chq-ffd--im chq-ffd--im-btn"
            onDragEnter={this.handleDragEnter}
            onDragLeave={this.handleDragLeave}
            onDragOver={this.handleDragOver}
            onDrop={this.handleDrop}
          >
            <div className="chq-btn">
              <Icon icon="images" />
              <span className="chq-ffd--im--bt-bg--text">{buttonLabel || "Upload an image"}</span>
              <input
                accept="image/*"
                ref={this.inputRef}
                {...props}
                type="file"
                id={name}
                name={name}
                onChange={this.handleFileSelected}
              />
            </div>
            {typeof progress === "number" && (
              <div
                className="chq-ffd--im--prog"
                role="progressbar"
                aria-valuemin={0}
                aria-valuenow={progress}
                aria-valuemax={100}
              >
                <div style={{ width: `${progress}%` }} />
              </div>
            )}
          </div>
          {failed && (
            <p className="chq-ffd--rq">Not a valid image.</p>
          )}
          {editorOpen && (
            <ModalDialog onClose={this.handleClose}>
              <ModalDialog.Body>
                <ImageEditor
                  aspectRatio={aspectRatio}
                  image={preview}
                  onEdit={this.handleImageEdited}
                  onFailure={this.handleImageFailure}
                />
              </ModalDialog.Body>
            </ModalDialog>
          )}
        </label>
      );
    }

    return (
      <div className={classnames(imageAsBackground && "chq-ffd--bg-img-container")}>
        {imageAsBackground && !editorOpen && (<div className="chq-ffd--bg-img--img" style={{ backgroundImage: `url("${preview || value}")` }} />)}
        <label className={classnames("chq-ffd", className, imageAsBackground && "chq-ffd--bg-img")} htmlFor={name}>
          <span className="chq-ffd--lb">{children}</span>
          <div
            className={classnames("chq-ffd--im", { "chq-ffd--im-drag": dragging })}
            onDragEnter={this.handleDragEnter}
            onDragLeave={this.handleDragLeave}
            onDragOver={this.handleDragOver}
            onDrop={this.handleDrop}
            style={{
              overflow: imageAsBackground ? "hidden" : "initial"
            }}
          >
            <ImagePreview
              editorOpen={editorOpen}
              image={image}
              imageAsBackground={imageAsBackground}
              preview={preview || normal}
            />
            {imageAsBackground ? (
              <div className="chq-ffd--im--bt-bg">
                <Icon icon="images" />
                <span className="chq-ffd--im--bt-bg--text">{buttonLabel || "Upload an image"}</span>
              </div>
            ) : (
              <>
                {!normal && (
                  <div className="chq-ffd--im--ph">
                    <Icon icon="images" />
                  </div>
                )}
                <div className="chq-ffd--im--bt">
                  <Icon icon="ios-cloud-upload-outline" />
                  {" "}
                  {buttonLabel || "Upload an image"}
                </div>
              </>
            )}
            <input
              accept="image/*"
              ref={this.inputRef}
              {...props}
              type="file"
              id={name}
              name={name}
              onChange={this.handleFileSelected}
            />
            {typeof progress === "number" && (
              <div
                className="chq-ffd--im--prog"
                role="progressbar"
                aria-valuemin={0}
                aria-valuenow={progress}
                aria-valuemax={100}
              >
                <div style={{ width: `${progress}%` }} />
              </div>
            )}
          </div>
          {failed && (
            <p className="chq-ffd--rq">Not a valid image.</p>
          )}
          {editorOpen && (
            <ModalDialog onClose={this.handleClose}>
              <ModalDialog.Body>
                <ImageEditor
                  aspectRatio={aspectRatio}
                  image={preview}
                  onEdit={this.handleImageEdited}
                  onFailure={this.handleImageFailure}
                />
              </ModalDialog.Body>
            </ModalDialog>
          )}
          <FormError
            name={name}
            onError={onError}
            required={required}
            submitted={submitted}
            touched={touched}
            validator={validator}
            value={normal}
          />
        </label>
      </div>
    );
  }
}

export default withForm(ImageField);
