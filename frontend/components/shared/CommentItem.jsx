import React from 'react';
import { connect } from 'react-redux';

import CommentForm from './CommentForm';
import CommentActions from './CommentActions';
import Comments from './Comments';
import PostNav from './PostNav';

class CommentItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { commentFormVisible: false, form: null };
  }

  toggleCommentForm() {
    this.setState(
      { commentFormVisible: !this.state.commentFormVisible },
      this.focusCommentForm.bind(this)
    );
  }

  hideCommentForm() {
    this.setState({ commentFormVisible: false });
  }

  focusCommentForm() {
    if (this.state.form) this.state.form.focus();
  }

  setCommentRef(ref) {
    this.setState({ form: ref });
  }

  render() {
    const { comment, currentUser } = this.props;
    const { author } = comment;

    return (
      <li className='post-comment-item'>
        <div className='pic-container'>
          <img src={ author.profilePicUrl }></img>
        </div>

        <div className='comment-content'>
          <div className='comment-top'>

          <div><a>{ author.name }</a><span>{ comment.body }</span></div>

          {
            author.id === currentUser.id ?
              <PostNav item={ comment } type={ 'comment' }/> :
              null
          }

          </div>

          <CommentActions
            commentId={ comment.id }
            commentableId={ comment.commentable_id }
            toggleCommentForm={ this.toggleCommentForm.bind(this) }
          />

          {
            comment.replies.length ?
              <Comments comments={ comment.replies } currentUser={ currentUser }/> :
              null
          }

          {
            this.state.commentFormVisible ?
              <CommentForm
                commentableId={ comment.commentable_id }
                commentableType={ comment.commentable_type }
                parentId={ comment.id }
                setCommentRef={ this.setCommentRef.bind(this) }
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
