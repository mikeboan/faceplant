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

  toggleCommentForm(e) {
    e.preventDefault();
    this.setState(
      { commentFormVisible: !this.state.commentFormVisible }
    );
  }

  render() {
    const { comment } = this.props;
    const { author } = comment;

    return (
      <li className='post-comment-item'>
        <img src={ author.profilePicUrl }></img>
        <div>
          <a>{ author.name }</a><span>{ comment.body }</span>
          <CommentActions
            commentId={ comment.id }
            commentableId={ comment.commentable_id }
            toggleCommentForm={ this.toggleCommentForm.bind(this) }
            />
          {
            this.state.commentFormVisible ?
              <CommentForm
                commentableId={comment.id}
                commentableType='Comment'
                /> :
              null
          }
          <Comments comments={ comment.replies }/>
        </div>
      </li>
    );
  }
}

export default CommentItem;
