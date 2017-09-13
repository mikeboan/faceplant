import React from 'react';

const Likers = ({ likers, likedByCurrentUser }) => {
  const numLikers = likedByCurrentUser ? likers.length - 1 : likers.length;

  let text;
  if (likedByCurrentUser) {
    if (numLikers === 0)      text = `You like this`;
    else if (numLikers === 1) text = `You and ${numLikers} person like this`;
    else                      text = `You and ${numLikers} people like this`;
  }
  else {
    if (numLikers === 1)      text = `${numLikers} person likes this`;
    else                      text = `${numLikers} people like this`;
  }

  return (
    <div className="likers">
      <img src={ window.staticImages.likeCircle }></img>
      <span>{ text }</span>
    </div>
  );
};

export default Likers;
