import React from 'react';
import { Link } from 'react-router-dom';

export default function ({ user }) {
  return (
    <li className='search-result-item'>
      <Link to={ `/profiles/${user.id}` }>
        <img src={ user.profilePicUrl }></img>
        <span>{ user.name }</span>
      </Link>
    </li>
  );
}
