import React from 'react';
import { Link } from 'react-router-dom';

const FriendListItem = ({ friend }) => (
  <li className='friend-item'>
    <Link to={ `/profiles/${friend.id}` }>
      <img src={ friend.profilePicUrl }></img>
      <div className="gradient">
        <span>{ friend.name }</span>
      </div>
    </Link>
  </li>
);

export default FriendListItem;
