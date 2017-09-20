import React from 'react';

const InfoItem = ({ iconUrl, content }) => (
  <li className='info-item'>
    <img src={iconUrl}></img>
    <span>{ content }</span>
  </li>
);

export default InfoItem;
