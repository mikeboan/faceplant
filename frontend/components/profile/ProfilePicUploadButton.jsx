import React from 'react';
import { connect } from 'react-redux';

import PhotoUpload from '../shared/PhotoUpload';
import { updateProfilePic } from '../../redux/modules/users';

const mapDispatchToProps = (dispatch, ownProps) => ({
  submit: data => dispatch(updateProfilePic(data))
})

class ProfilePicUploadButton extends React.Component {
  constructor(props) {
    super(props)

    this.state = { hovered: false };

    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  handleMouseEnter() {
    this.setState({ hovered: true });
  }

  handleMouseLeave() {
    this.setState({ hovered: false });
  }

  buttonClassName() {
    if (this.state.hovered) return 'update-profile-pic active super-active';
    else if (this.props.active) return 'update-profile-pic active';
    else return 'update-profile-pic';
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
          resourceName='user'
          imageName='profile_pic'
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
)(ProfilePicUploadButton);
