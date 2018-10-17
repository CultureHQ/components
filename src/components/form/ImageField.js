import React, { Component } from "react";

import classnames from "../../classnames";
import Icon from "../Icon";
import ModalDialog from "../modals/ModalDialog";
import ImageEditor from "../ImageEditor";

const freeObjectURL = image => {
  if (image) {
    URL.revokeObjectURL(image);
  }
};

class ImageField extends Component {
  state = {
    editorOpen: false,
    failed: false,
    image: null
  };

  componentWillUnmount() {
    const { image } = this.state;
    freeObjectURL(image);
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
    this.setState(state => {
      freeObjectURL(state.image);
      return { editorOpen, failed, image: image ? URL.createObjectURL(image) : null };
    });

    const { name, onChange, onFormChange } = this.props;

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

    const { editorOpen, failed, image } = this.state;

    const preview = image || value;
    const backgroundImage = preview ? `url(${preview})` : null;

    return (
      <label className={classnames("chq-ffd", className)} htmlFor={name}>
        <span className="chq-ffd--lb">{children}</span>
        <div className="chq-ffd--im" style={{ backgroundImage }}>
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
