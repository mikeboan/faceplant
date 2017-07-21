import React from 'react';
import { Link } from 'react-router-dom';

const FriendListItem = ({ friend }) => (
  <div className='friend-item'>
    <Link to={ `/profiles/${friend.id}` }>
      <img src={ friend.profilePicUrl }></img>
      <span>{ friend.name }</span>
    </Link>
  </div>
);

export default FriendListItem;
