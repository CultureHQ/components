/* eslint-disable jsx-a11y/media-has-caption */
import React from "react";

import classnames from "../../classnames";
import Icon from "../Icon";
import ModalDialog from "../modals/ModalDialog";
import ImageEditor from "../ImageEditor";
import ImagePreview from "../ImagePreview";
import FormError from "./FormError";
import VideoEditor from "../VideoEditor";
import { FormState, withForm } from "./Form";
import { FormFieldError } from "./typings";

export type MediaFieldValue = Blob | File | string | null;
export type UrlValue = string | null;

type HijackedProps = "className" | "name" | "onChange" | "required" | "value";
type MediaFieldProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, HijackedProps> & {
  aspectRatio?: number;
  autoFocus?: boolean;
  imageAsBackground?: boolean;
  buttonLabel?: string;
  children: React.ReactNode;
  className?: string;
  name: string;
  onChange?: (value: MediaFieldValue, thumbUrl: UrlValue, gifUrl: UrlValue) => void;
  progress?: number;
  required?: boolean;
  validator?: (value: MediaFieldValue) => FormFieldError;
  value?: MediaFieldValue;
};

type MediaFieldState = {
  editorOpen: boolean;
  videoEditorOpen: boolean;
  dragging: boolean;
  failed: boolean;
  image: MediaFieldValue;
  preview: string | null;
  touched: boolean;
  video: MediaFieldValue;
};

type ImageSelectedOptions = {
  editorOpen: boolean;
  failed: boolean;
  image: MediaFieldValue;
};

class MediaField extends React.Component<MediaFieldProps & FormState, MediaFieldState> {
  inputRef = React.createRef<HTMLInputElement>();

  state = {
    dragging: false,
    editorOpen: false,
    videoEditorOpen: false,
    failed: false,
    image: null,
    preview: null,
    touched: false,
    video: null
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
    const media = files && files[0];
    if (media?.type?.startsWith("video/")) {
      this.handleVideoSelected(media, null, null);
      return;
    }

    this.handleImageSelected({ editorOpen: !!media, failed: false, image: media || null });
  };

  handleImageEdited = (image: Blob) => {
    this.handleImageSelected({ editorOpen: false, failed: false, image });
  };

  handleImageFailure = () => {
    this.handleImageSelected({ editorOpen: false, failed: true, image: null });
  };

  handleVideoEdited = ({ thumbUrl, gifUrl }: {thumbUrl: string, gifUrl: string}) => {
    const { video } = this.state;
    this.setState({ videoEditorOpen: false });
    this.handleVideoSelected(video, thumbUrl, gifUrl);
  };

  handleVideoFailure = () => {
    this.handleVideoSelected(null, null, null);
  };

  handleVideoSelected = (
    video: MediaFieldValue, thumbUrl: string | null, gifUrl: string | null
  ) => {
    const { name, onChange, onFormChange } = this.props;

    this.setState({ video, image: null, preview: null, videoEditorOpen: !!video });

    if (onChange) {
      onChange(video, thumbUrl, gifUrl);
    }

    onFormChange(name, video);
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
        touched: true,
        video: null
      };
    });

    if (onChange) {
      onChange(image, null, null);
    }

    onFormChange(name, image);
  };

  handleClose = () => {
    this.setState({ editorOpen: false, videoEditorOpen: false });
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
      disabledStates, errors, name, onChange, onError, onFieldDisabledChange,
      onFormChange, progress, required, submitted, submitting, validator, value, values, ...props
    } = this.props;

    const {
      dragging, editorOpen, videoEditorOpen, failed, image, preview, touched, video
    } = this.state;

    const normal: any = value || (values[name] as MediaFieldValue | undefined) || null;

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
            {video && <video className="chq-ffd--video" controls src={URL.createObjectURL(video)} />}
            {(image || preview || (normal && !normal?.type?.startsWith("video/"))) && (
              <ImagePreview
                editorOpen={editorOpen}
                image={image}
                imageAsBackground={imageAsBackground}
                preview={preview || normal}
              />
            )}
            {imageAsBackground ? (
              <div className="chq-ffd--im--bt-bg">
                <Icon icon="images" />
                <span className="chq-ffd--im--bt-bg--text">{buttonLabel || "Upload a media file"}</span>
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
                  {buttonLabel || "Upload a media file"}
                </div>
              </>
            )}
            <input
              accept="image/*,video/*"
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
          {videoEditorOpen && (
            <ModalDialog onClose={this.handleClose}>
              <ModalDialog.Body>
                <VideoEditor
                  video={video}
                  onEdit={this.handleVideoEdited}
                  onFailure={this.handleVideoFailure}
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

export default withForm(MediaField);
