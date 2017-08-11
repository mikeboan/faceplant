import React from 'react';

import CommentItem from './CommentItem';

const Comments = ({ comments, users }) => (
  <ul className='post-comments'>
    {
      comments.map( (comment, i) =>
        <CommentItem
          key={ comment.id }
          comment={ comment }
        />
      )
    }
  </ul>
);

export default Comments;
