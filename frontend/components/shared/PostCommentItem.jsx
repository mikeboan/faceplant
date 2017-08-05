import React from 'react';
import { connect } from 'react-redux';

import CommentForm from './CommentForm';
import CommentActions from './CommentActions';

class PostCommentItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { commentFormVisible: false };
  }

  toggleCommentForm(e) {
    e.preventDefault();
    this.setState(
      { commentFormVisible: !this.state.commentFormVisible },
      ()=>{ debugger }
    );
  }

  render() {
    const { comment, author } = this.props;
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
        </div>
      </li>
    );
  }
}

// export default connect(mapStateToProps)(PostCommentItem);
export default PostCommentItem;
