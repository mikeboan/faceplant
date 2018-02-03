import React from 'react';
import { connect } from 'react-redux';

class PhotoUpload extends React.Component {
  constructor(props) {
    super(props)

    this.state = { imageFile: null, imageUrl: null };
    this.updateFile = this.updateFile.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateFile (e) {
    const file = e.currentTarget.files[0];
    const fileReader = new FileReader();

    fileReader.onloadend = () => {
      this.setState(
        { imageFile: file, imageUrl: fileReader.result },
        this.handleSubmit
      );
    };

    if (file) fileReader.readAsDataURL(file);
  }

  handleSubmit() {
    const { resourceName, imageName, submit } = this.props;
    const formData = new FormData();

    if (this.state.imageFile)
      formData.append(
        `${resourceName}[${imageName}]`,
        this.state.imageFile
      );

    submit(formData);
  }

  render() {
    return (
      <input
        className={`photo-upload ${this.props.buttonClassName}`}
        type='file'
        onChange={this.updateFile}>
      </input>
    );
  }
}

export default PhotoUpload;
