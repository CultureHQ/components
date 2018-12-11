import React, { Component } from "react";

import classnames from "../../classnames";
import Icon from "../Icon";
import ModalDialog from "../modals/ModalDialog";
import ImageEditor from "../ImageEditor";
import ImagePreview from "../ImagePreview";
import FormError from "./FormError";
import { withForm } from "./Form";

class ImageField extends Component {
  static defaultProps = {
    aspectRatio: null,
    autoFocus: false,
    onChange: () => {},
    onFormChange: () => {},
    values: {}
  };

  inputRef = React.createRef();

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

    if (autoFocus) {
      this.inputRef.current.focus();
    }
  }

  handleFileSelected = ({ target: { files: [image] } }) => {
    this.handleImageSelected({ editorOpen: !!image, failed: false, image: image || null });
  };

  handleImageEdited = image => {
    this.handleImageSelected({ editorOpen: false, failed: false, image });
  };

  handleImageFailure = () => {
    this.handleImageSelected({ editorOpen: false, failed: true, image: null });
  };

  handleImageSelected = ({ editorOpen, failed, image }) => {
    const { name, onChange, onFormChange } = this.props;

    this.setState(state => {
      URL.revokeObjectURL(state.preview);

      return {
        editorOpen,
        failed,
        image,
        preview: image && URL.createObjectURL(image),
        touched: true
      };
    });

    onChange(image);
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

  handleDragOver = event => {
    event.preventDefault();
    return false;
  };

  handleDrop = event => {
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
            <div className="chq-ffd--im--prog">
              <div data-value={progress} style={{ width: `${progress}%` }} />
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
