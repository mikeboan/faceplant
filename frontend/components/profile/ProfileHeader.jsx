import React from 'react';
import { Link } from 'react-router-dom';

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
      <Link to={`/profiles/${user.id}`}>Timeline</Link>
      <Link to={`/profiles/${user.id}/about`}>About</Link>
      <Link to={`/profiles/${user.id}/friends`}>Friends</Link>
      <Link to={`/profiles/${user.id}/photos`}>photos</Link>
    </nav>
  </div>
);

export default ProfileHeader;
