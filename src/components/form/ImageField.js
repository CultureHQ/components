import React, { Component } from "react";

import classnames from "../../classnames";
import Icon from "../Icon";

class ImageField extends Component {
  state = { backgroundImage: null };

  handleChange = ({ target: { files: [value] } }) => {
    const { name, onChange, onFormChange } = this.props;

    this.setState({
      backgroundImage: value ? `url(${URL.createObjectURL(value)})` : null
    });

    if (onChange) {
      onChange(value);
    }

    if (onFormChange) {
      onFormChange(name, value);
    }
  };

  render() {
    const { children, className, onChange, onFormChange, onError, name, submitted, value, ...props } = this.props;
    const { backgroundImage } = this.state;

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
          <input {...props} type="file" id={name} onChange={this.handleChange} />
        </div>
      </label>
    );
  }
}

export default ImageField;
