import React from 'react';

class ProfileHeader extends React.Component {

  render() {
    return (
      <div className='profile-header'>
        <div className='cover-photo-container'>
          <img src={this.props.user.coverPhotoUrl} />
        </div>
      </div>
    );
  }
}

export default ProfileHeader;
