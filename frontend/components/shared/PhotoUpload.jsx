import React from 'react';
import { connect } from 'react-redux';

class PhotoUpload extends React.Component {
  constructor(props) {
    super(props)

    this.state = { imageFile: null, imageUrl: null };
    this.updateFile = this.updateFile.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
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

  handleClick(e) {
    this.input.click();
  }

  render() {
    return (
      <div
        className={`photo-upload ${this.props.buttonClassName}`}
        onClick={ this.handleClick }
      >
        <input
          type='file'
          onChange={this.updateFile}
          ref={ el => this.input = el }
        ></input>
        <img src={window.staticImages.camera}></img>
      </div>
    );
  }
}

export default PhotoUpload;
