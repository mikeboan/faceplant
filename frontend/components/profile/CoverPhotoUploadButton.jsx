import React from 'react';
import { connect } from 'react-redux';

import PhotoUpload from '../shared/PhotoUpload';
import { updateCoverPhoto } from '../../redux/modules/profiles';

const mapDispatchToProps = (dispatch, ownProps) => ({
  submit: data => dispatch(updateCoverPhoto(data))
})

class CoverPhotoUploadButton extends React.Component {
  constructor(props) {
    super(props)

    this.state = { hovered: false };

    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  handleMouseEnter() {
    console.log('mouse entered');
    this.setState({ hovered: true });
  }

  handleMouseLeave() {
    console.log('mouse leave');
    this.setState({ hovered: false });
  }

  buttonClassName() {
    if (this.state.hovered) return 'update-cover-photo active super-active';
    else if (this.props.active) return 'update-cover-photo active';
    else return 'update-cover-photo';
  }

  render() {
    const { submit, active } = this.props;

    return (
      <div
        onMouseEnter={ this.handleMouseEnter }
        onMouseLeave={ this.handleMouseLeave }
      >
        <PhotoUpload
          buttonClassName={ this.buttonClassName() }
          resourceName='profile'
          imageName='cover_photo'
          src={ window.staticImages.bwCamera }
          submit={ submit }
          />
      </div>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(CoverPhotoUploadButton);
