import React from 'react';
import { NavLink } from 'react-router-dom';

import HeaderButtons from './HeaderButtons';
import CoverPhotoUploadButton from './CoverPhotoUploadButton';

const ProfileHeader = ({ user, currentUser, profile}) => (
  <div className='profile-header'>
    {
      user.id === currentUser.id ?
        <CoverPhotoUploadButton /> :
        null
    }
    <div
      className='cover-photo-container'
      style={{ background: `no-repeat center/cover url(${profile.coverPhotoUrl})` }}
    >
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

export default ProfileHeader;
