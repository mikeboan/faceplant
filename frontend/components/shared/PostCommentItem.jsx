import React from 'react';
import { connect } from 'react-redux';

import { currentUserLikesComment } from '../../selectors/selectors';

const mapStateToProps = (state, ownProps) => ({

});

const PostCommentItem = ({ comment, author }) => (
  <li className='post-comment-item'>
    <img src={ author.profilePicUrl }></img>
    <div>
      <a>{ author.name }</a><span>{ comment.body }</span>
      <CommentActions
        commentId={ comment.id }
        postId={ comment.commentable_id }
      />
    </div>
  </li>
);

export default connect(mapStateToProps)(PostCommentItem);
