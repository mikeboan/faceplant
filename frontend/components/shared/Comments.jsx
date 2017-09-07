import React from 'react';

import CommentItem from './CommentItem';

const Comments = ({ comments, users, currentUser }) => (
  <ul className='post-comments'>
    {
      comments.map( (comment, i) =>
        <CommentItem
          key={ comment.id }
          comment={ comment }
          currentUser={ currentUser }
        />
      )
    }
  </ul>
);

export default Comments;
