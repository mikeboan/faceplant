import React from 'react';
import { connect } from 'react-redux';

import { selectPostComments, selectUser } from '../../selectors/selectors';

const mapStateToProps = (state, { postId }) => {
  const comments = selectPostComments(state, postId);
  const users = {};
  comments.forEach( ({ author_id }) => {
    Object.assign(users, { [author_id]: selectUser(state, author_id) });
  });

  return { comments, users };
};

const PostComments = ({ comments, users }) => (
  <ul className='post-comments'>
    {
      comments.map( (comment, i) =>
        <PostCommentItem key={ comment.id } comment={ comment } user={ users[comment.author_id] } />
      )
    }
  </ul>
);

const PostCommentItem = ({ comment, user }) => (
  <li className='post-comment-item'>
    <img src={ user.profilePicUrl }></img>
    <div>
      <a>{ user.name }</a><span>{ comment.body }</span>
      <CommentActions commentId={ comment.id } postId={ comment.commentable_id } />
    </div>
  </li>
);

const CommentActions = (props) => <div className='comment-actions'>Like Reply etc.</div>;

export default connect(mapStateToProps)(PostComments);
