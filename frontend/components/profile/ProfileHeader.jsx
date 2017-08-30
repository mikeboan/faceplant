import React from 'react';
import { NavLink } from 'react-router-dom';

const ProfileHeader = ({ user, profile}) => (
  <div className='profile-header shadow'>
    <div className='cover-photo-container'>
      <img className='cover-photo' src={profile.coverPhotoUrl} />
    </div>
    <div className="profile-pic-container">
      <img className='profile-pic' src={user.profilePicUrl} />
    </div>
    <div className='username'>
      { user.name }
    </div>
    <nav>
      <NavLink to={`/profiles/${user.id}`} exact>Timeline</NavLink>
      <NavLink to={`/profiles/${user.id}/about`}>About</NavLink>
      <NavLink to={`/profiles/${user.id}/friends`}>Friends</NavLink>
      <NavLink to={`/profiles/${user.id}/photos`}>photos</NavLink>
    </nav>
  </div>
);

export default ProfileHeader;
