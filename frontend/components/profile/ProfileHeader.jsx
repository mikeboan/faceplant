import React from 'react';
import { NavLink } from 'react-router-dom';

import HeaderButtons from './HeaderButtons';
import CoverPhotoUploadButton from './CoverPhotoUploadButton';
import ProfilePicUploadButton from './ProfilePicUploadButton';

class ProfileHeader extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      coverPhotoHovered: false,
      profilePicHovered: false,
    };
  }


  handleMouseEnter(field) {
    return () => {
      if (this.props.user.id === this.props.currentUser.id)
        this.setState({ [`${field}Hovered`]: true });
    }
  }

  handleMouseLeave(field) {
    return () => {
      if (this.props.user.id === this.props.currentUser.id)
        this.setState({ [`${field}Hovered`]: false });
    }
  }

  render() {
    const { user, currentUser, profile } = this.props;

    return (
      <div className='profile-header'>
        <div
          className='cover-photo-container'
          onMouseEnter={ this.handleMouseEnter('coverPhoto') }
          onMouseLeave={ this.handleMouseLeave('coverPhoto') }
          style={{ background: `no-repeat center/cover url(${profile.coverPhotoUrl})` }}
        >
          {
            user.id === currentUser.id ?
              <CoverPhotoUploadButton active={ this.state.coverPhotoHovered }/> :
              null
          }
        </div>
        <div
          className="profile-pic-container"
          onMouseEnter={ this.handleMouseEnter('profilePic') }
          onMouseLeave={ this.handleMouseLeave('profilePic') }
          >
          <div className='profile-pic-border'>
            <img className='profile-pic' src={user.profilePicUrl} />
            {
              user.id === currentUser.id ?
              <ProfilePicUploadButton active={ this.state.profilePicHovered } /> :
                null
            }
          </div>
        </div>
        <div className='username'>
          { user.name }
        </div>
        <nav className="profile-header-nav">
          <NavLink to={`/profiles/${user.id}`} exact>Timeline</NavLink>
          <NavLink to={`/profiles/${user.id}/about`}>About</NavLink>
          <NavLink to={`/profiles/${user.id}/friends`}>Friends</NavLink>
          <NavLink to={`/profiles/${user.id}/photos`}>Photos</NavLink>
        </nav>

        <HeaderButtons user={user} currentUser={currentUser} profile={profile} />
      </div>
    );
  }
}

export default ProfileHeader;
