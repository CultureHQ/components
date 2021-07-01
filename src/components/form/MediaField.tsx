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
  onChange?: (value: MediaFieldValue, thumb: MediaFieldValue,
    gifUrl: MediaFieldValue, duration: any) => void;
  onProcessing?: (value: boolean) => void;
  progress?: number;
  required?: boolean;
  validator?: (value: MediaFieldValue) => FormFieldError;
  value?: MediaFieldValue;
  videoThumb?: MediaFieldValue;
  showControls?: boolean;
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
  thumb: MediaFieldValue;
  videoLenght: any;
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
    video: null,
    thumb: null,
    videoLenght: null
  };

  componentDidMount() {
    const { autoFocus } = this.props;
    const input = this.inputRef.current;

    if (autoFocus && input) {
      input.focus();
    }
  }

  componentDidUpdate(prevProps: any) {
    const { videoThumb } = this.props;
    if (videoThumb !== prevProps.videoThumb) {
      this.setState({ video: null });
      this.setState({ thumb: null });
    }
  }

  handleFileSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    const media = files && files[0];
    if (media?.type?.startsWith("video/")) {
      this.handleVideoSelected(media, null, null, true);
      return;
    }

    if (media?.type === "image/heic") {
      this.handleImageSelected({ editorOpen: false, failed: false, image: media || null });
    } else {
      this.handleImageSelected({ editorOpen: !!media, failed: false, image: media || null });
    }
  };

  handleImageEdited = (image: Blob) => {
    this.handleImageSelected({ editorOpen: false, failed: false, image });
  };

  handleImageFailure = () => {
    this.handleImageSelected({ editorOpen: false, failed: true, image: null });
  };

  handleVideoEdited = (thumb: Blob) => {
    const { video } = this.state;
    this.setState({ videoEditorOpen: false });
    this.handleVideoSelected(video, thumb, null, false);
  };

  handleVideoSelected = (
    video: MediaFieldValue, thumb: Blob | null, gifUrl: string | null, videoEditorOpen: boolean
  ) => {
    const { videoLenght } = this.state;
    const { name, onChange, onFormChange } = this.props;

    this.setState({ video, image: null, preview: null, videoEditorOpen, thumb });

    if (onChange) {
      onChange(video, thumb, gifUrl, videoLenght);
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
      onChange(image, null, null, null);
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

  getThumbnail = (): string => {
    const { preview, video, thumb } = this.state;
    const { value, videoThumb } = this.props;

    if (videoThumb) {
      return videoThumb as string;
    }

    return (video && thumb) ? URL.createObjectURL(thumb) : (preview || value) as string;
  };

  render() {
    const {
      aspectRatio, autoFocus, imageAsBackground, buttonLabel, children, className,
      disabledStates, errors, name, onChange, onError, onFieldDisabledChange,
      onFormChange, progress, required, submitted, submitting, validator, value,
      videoThumb, values, onProcessing, showControls = true, ...props
    } = this.props;

    const {
      dragging, editorOpen, videoEditorOpen,
      failed, image, preview, touched, video, thumb
    } = this.state;

    const normal: any = value || (values[name] as MediaFieldValue | undefined) || null;

    return (
      <div className={classnames(imageAsBackground && "chq-ffd--bg-img-container")}>
        {imageAsBackground && !editorOpen && (<div className="chq-ffd--bg-img--img" style={{ backgroundImage: `url("${this.getThumbnail()}")` }} />)}
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
            {((video || videoThumb) && !image) && (
              <video
                className="chq-ffd--video"
                controls={showControls}
                poster={this.getThumbnail()}
                onLoadedMetadata={e => {
                  const target = e.target as HTMLVideoElement;
                  if (onChange) {
                    onChange(video, thumb, null, target.duration);
                  }
                }}
                src={(videoThumb && !video) ? value as string : URL.createObjectURL(video)}
              />
            )}
            {(image || preview || (normal && !video && !videoThumb)) && (
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
              accept=".heic,image/*,video/*"
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
            <VideoEditor
              video={video}
              onEdit={this.handleVideoEdited}
              onProcessing={onProcessing}
            />
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
