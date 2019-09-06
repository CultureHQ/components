import * as React from "react";

import classnames from "../../classnames";
import Icon from "../Icon";
import ModalDialog from "../modals/ModalDialog";
import ImageEditor from "../ImageEditor";
import ImagePreview from "../ImagePreview";
import FormError from "./FormError";
import { FormState, withForm } from "./Form";

type ImageFieldValue = Blob | File | null;

type ImageFieldProps = React.HTMLAttributes<HTMLInputElement> & {
  aspectRatio?: number;
  autoFocus?: boolean;
  children: React.ReactNode;
  className?: string;
  name: string;
  onChange?: (value: ImageFieldValue) => void;
  progress?: number;
  required?: boolean;
  validator?: (value: ImageFieldValue) => string | null;
  value?: ImageFieldValue;
};

type ImageFieldState = {
  editorOpen: boolean;
  dragging: boolean;
  failed: boolean;
  image: ImageFieldValue;
  preview: string | undefined;
  touched: boolean;
};

class ImageField extends React.Component<ImageFieldProps & FormState, ImageFieldState> {
  inputRef = React.createRef<HTMLInputElement>();

  state = {
    dragging: false,
    editorOpen: false,
    failed: false,
    image: null,
    preview: undefined,
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

  handleImageSelected = ({ editorOpen, failed, image }: { editorOpen: boolean, failed: boolean, image: ImageFieldValue }) => {
    const { name, onChange, onFormChange } = this.props;

    this.setState(state => {
      if (state.preview) {
        URL.revokeObjectURL(state.preview);
      }

      return {
        editorOpen,
        failed,
        image,
        preview: image ? URL.createObjectURL(image) : undefined,
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
      aspectRatio, autoFocus, children, className, errors, name, onChange,
      onError, onFormChange, progress, required, submitted, submitting,
      validator, value, values, ...props
    } = this.props;

    const { dragging, editorOpen, failed, image, preview, touched } = this.state;

    const normal = value || values[name];

    return (
      <label className={classnames("chq-ffd", className)} htmlFor={name}>
        <span className="chq-ffd--lb">{children}</span>
        <div
          className={classnames("chq-ffd--im", { "chq-ffd--im-drag": dragging })}
          onDragEnter={this.handleDragEnter}
          onDragLeave={this.handleDragLeave}
          onDragOver={this.handleDragOver}
          onDrop={this.handleDrop}
        >
          <ImagePreview image={image} preview={preview || normal} />
          {!normal && (
            <div className="chq-ffd--im--ph">
              <Icon icon="images" />
            </div>
          )}
          <div className="chq-ffd--im--bt">
            <Icon icon="ios-cloud-upload-outline" />
            {" "}
            Upload an image
          </div>
          <input
            accept="image/*"
            ref={this.inputRef}
            {...props}
            type="file"
            id={name}
            name={name}
            onChange={this.handleFileSelected}
          />
          {progress && (
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
    );
  }
}

export default withForm(ImageField);
