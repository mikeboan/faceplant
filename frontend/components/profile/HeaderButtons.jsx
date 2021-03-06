import React from 'react';

import EditProfileButton from './EditProfileButton';
import FriendButton from './FriendButton';
import MessageButton from './MessageButton';

const HeaderButtons = ({currentUser, user, profile}) => (
  <nav className="profile-header-buttons">
    {
      currentUser.id === user.id ?
        <EditProfileButton profile={profile} /> :
        [
          <FriendButton user={user} currentUser={currentUser} key='hb-1' />,
          <MessageButton key='hb-2' />
        ]
    }
  </nav>
);

export default HeaderButtons;
