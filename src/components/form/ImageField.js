import React, { Component } from "react";

import classnames from "../../classnames";
import Icon from "../Icon";
import ModalDialog from "../modals/ModalDialog";
import ImageEditor from "../ImageEditor";
import ImagePreview from "../ImagePreview";

class ImageField extends Component {
  state = {
    editorOpen: false,
    failed: false,
    image: null,
    preview: null
  };

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
      return { editorOpen, failed, image, preview: image && URL.createObjectURL(image) };
    });

    if (onChange) {
      onChange(image);
    }

    if (onFormChange) {
      onFormChange(name, image);
    }
  };

  handleClose = () => {
    this.setState({ editorOpen: false });
  };

  render() {
    const {
      children, className, name, onChange, onFormChange, onError, progress,
      submitted, value, ...props
    } = this.props;

    const { editorOpen, failed, image, preview } = this.state;

    return (
      <label className={classnames("chq-ffd", className)} htmlFor={name}>
        <span className="chq-ffd--lb">{children}</span>
        <div className="chq-ffd--im">
          <ImagePreview image={image} preview={preview || value} />
          {!value && (
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
}

export default ImageField;
