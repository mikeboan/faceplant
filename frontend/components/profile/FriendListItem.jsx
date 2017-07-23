import React from 'react';
import { Link } from 'react-router-dom';

const FriendListItem = ({ friend }) => (
  <div className='friend-item'>
    <Link to={ `/profiles/${friend.id}` }>
      <img src={ friend.profilePicUrl }></img>
      <div className="gradient">
        <span>{ friend.name }</span>
      </div>
    </Link>
  </div>
);

export default FriendListItem;
