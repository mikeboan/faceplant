import React from 'react';
import { connect } from 'react-redux';

import CommentForm from './CommentForm';
import CommentActions from './CommentActions';
import Comments from './Comments';

class CommentItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { commentFormVisible: false };
  }

  toggleCommentForm() {
    this.setState(
      { commentFormVisible: !this.state.commentFormVisible }
    );
  }

  hideCommentForm() {
    this.setState({ commentFormVisible: false });
  }

  render() {
    const { comment } = this.props;
    const { author } = comment;

    return (
      <li className='post-comment-item'>
        <div className='pic-container'>
          <img src={ author.profilePicUrl }></img>
        </div>

        <div>
          <a>{ author.name }</a><span>{ comment.body }</span>
          <CommentActions
            commentId={ comment.id }
            commentableId={ comment.commentable_id }
            toggleCommentForm={ this.toggleCommentForm.bind(this) }
            />
          {
            comment.replies.length ?
              <Comments comments={ comment.replies }/> :
              null
          }
          {
            this.state.commentFormVisible ?
            <CommentForm
              commentableId={ comment.commentable_id }
              commentableType={ comment.commentable_type }
              parentId={ comment.id }
              hideCommentForm={ this.hideCommentForm.bind(this) }
              /> :
              null
            }
        </div>
      </li>
    );
  }
}

export default CommentItem;
