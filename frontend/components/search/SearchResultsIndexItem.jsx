import React from 'react';
import { Link } from 'react-router-dom';

export default function ({ user, handleClick }) {
  return (
    <li className='search-result-item' onClick={ handleClick }>
      <Link to={ `/profiles/${user.id}` }>
        <img src={ user.profilePicUrl }></img>
        <span>{ user.name }</span>
      </Link>
    </li>
  );
}
