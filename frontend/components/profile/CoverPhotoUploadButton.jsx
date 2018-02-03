import React from 'react';
import { connect } from 'react-redux';

import PhotoUpload from '../shared/PhotoUpload';
import { updateCoverPhoto } from '../../redux/modules/profiles';

const mapDispatchToProps = (dispatch, ownProps) => ({
  submit: data => dispatch(updateCoverPhoto(data))
})

const CoverPhotoUploadButton = ({ submit }) => (
  <PhotoUpload
    buttonClassName='update-cover-photo'
    resourceName='profile'
    imageName='cover_photo'
    submit={ submit }
  />
);


export default connect(
  null,
  mapDispatchToProps
)(CoverPhotoUploadButton);
