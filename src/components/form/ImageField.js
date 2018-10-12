import React, { Component } from "react";

import classnames from "../../classnames";
import Icon from "../Icon";
import ModalDialog from "../modals/ModalDialog";
import ImageEditor from "../ImageEditor";

class ImageField extends Component {
  state = {
    editorOpen: false,
    failed: false,
    image: null
  };

  handleFileSelected = ({ target: { files: [value] } }) => {
    this.setState({
      editorOpen: !!value,
      failed: false,
      image: value ? URL.createObjectURL(value) : null
    });

    this.handleImageSelected(value || null);
  };

  handleImageEdited = value => {
    this.setState({
      editorOpen: false,
      failed: false,
      image: URL.createObjectURL(value)
    });

    this.handleImageSelected(value);
  };

  handleImageFailure = () => {
    this.setState({ editorOpen: false, image: null });
    this.handleImageSelected(null);
    this.setState({ failed: true });
  };

  handleImageSelected = value => {
    const { name, onChange, onFormChange } = this.props;

    if (onChange) {
      onChange(value);
    }

    if (onFormChange) {
      onFormChange(name, value);
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

    const backgroundImage = image ? `url(${image})` : null;

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
                image={image}
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
