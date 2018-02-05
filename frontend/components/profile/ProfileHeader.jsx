import React from 'react';
import { NavLink } from 'react-router-dom';

import HeaderButtons from './HeaderButtons';
import CoverPhotoUploadButton from './CoverPhotoUploadButton';

class ProfileHeader extends React.Component {
  constructor(props) {
    super(props)

    this.state = { hovered: false };

    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }


  handleMouseEnter() {
    if (this.props.user.id === this.props.currentUser.id)
      this.setState({ hovered: true });
  }

  handleMouseLeave() {
    if (this.props.user.id === this.props.currentUser.id)
      this.setState({ hovered: false });
  }

  render() {
    const { user, currentUser, profile } = this.props;

    return (
      <div className='profile-header'>
        <div
          className='cover-photo-container'
          onMouseEnter={ this.handleMouseEnter }
          onMouseLeave={ this.handleMouseLeave }
          style={{ background: `no-repeat center/cover url(${profile.coverPhotoUrl})` }}
        >
        {
          user.id === currentUser.id ?
            <CoverPhotoUploadButton active={ this.state.hovered }/> :
            null
          }
        </div>
        <div className="profile-pic-container">
          <img className='profile-pic' src={user.profilePicUrl} />
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
