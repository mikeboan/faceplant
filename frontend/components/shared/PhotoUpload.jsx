import React from 'react';
import { connect } from 'react-redux';
import { updateCoverPhoto } from '../../redux/modules/profiles';

const mapStateToProps = (state, ownProps) => ({

})

const mapDispatchToProps = (dispatch, ownProps) => ({
  submit: (formData) => dispatch(updateCoverPhoto(formData)),
})

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

    if (file)  fileReader.readAsDataURL(file);
  }

  handleSubmit() {
    const formData = new FormData();
    if (this.state.imageFile)
      formData.append("profile[cover_photo]", this.state.imageFile);
    this.props.submit(formData);
  }

  render() {
    return (
      <input
        className={`photo-upload ${this.props.className}`}
        type='file'
        onChange={this.updateFile}>
      </input>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PhotoUpload);
