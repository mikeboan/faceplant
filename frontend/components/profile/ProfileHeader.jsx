import React from 'react';
import { Link } from 'react-router-dom';

class ProfileHeader extends React.Component {

  render() {
    return (
      <div className='profile-header shadow'>
        <div className='cover-photo-container'>
          <img className='cover-photo' src={this.props.profile.coverPhotoUrl} />
        </div>
        <div className="profile-pic-container">
          <img className='profile-pic' src={this.props.user.profilePicUrl} />
        </div>
        <div className='username'>
          { this.props.user.name }
        </div>
        <nav>
          <Link to=''>Timeline</Link>
          <Link to=''>About</Link>
          <Link to=''>Friends</Link>
        </nav>
      </div>
    );
  }
}

export default ProfileHeader;
