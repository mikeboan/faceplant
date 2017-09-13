import React from 'react';

const Likers = ({ likers, likedByCurrentUser }) => {
  const numLikers = likedByCurrentUser ? likers.length - 1 : likers.length;

  let text;
  if (likedByCurrentUser && numLikers) text = `You and ${numLikers} others like this`;
  else if (likedByCurrentUser)         text = `You like this`;
  else {
    if (numLikers == 1)                text = `${numLikers} other likes this`;
    else                               text = `${numLikers} others like this`;
  }

  return (
    <div className="likers">
      <img src={ window.staticImages.likeCircle }></img>
      <span>{ text }</span>
    </div>
  );
};

export default Likers;
