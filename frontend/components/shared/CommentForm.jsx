import React from 'react';
import { connect } from 'react-redux';

import { selectCurrentUser } from '../../selectors/selectors';
import { postComment } from '../../redux/modules/comments';

const mapStateToProps = (state, ownProps) => ({
  currentUser: selectCurrentUser(state)
});

const mapDispatchToProps = (dispatch) => ({
  postComment: comment => dispatch(postComment(comment))
});


class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { body: "" };

    this.setRef = this.setRef.bind(this);
  }

  handleUpdate(field) {
    return (e) => {
      e.preventDefault();
      this.autosize(e);
      this.setState({ [field]: e.currentTarget.value });
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    const el = e.target;

    const { commentableType, commentableId, parentId } = this.props;
    const comment = Object.assign(
      {
        commentable_type: commentableType,
        commentable_id: commentableId,
        parent_id: parentId
      },
      this.state
    );
    this.props.postComment(comment)
      .then(() => this.setState({ body: "" }))
      .then(() => el.style.cssText = 'height:auto;')
      .then(this.props.hideCommentForm);
  }

  setRef(input) {
    this.input = input;
    this.props.setCommentRef(input);
  }

  handleKeyDown(e) {
    e = e || event;
    if (e.keyCode === 13 && !e.ctrlKey) this.handleSubmit(e);
  }

  autosize(e) {
    const el = e.target;
    el.style.cssText = 'height:auto;';
    el.style.cssText = 'height:' + el.scrollHeight + 'px';
  }

  render() {
    return (
      <form onSubmit={ this.handleSubmit.bind(this) } className='post-comment-form'>
        <img src={ this.props.currentUser.profilePicUrl }></img>
        <textarea
          id={`post-${this.props.postId}`}
          onChange={ this.handleUpdate('body') }
          onKeyDown={ this.handleKeyDown.bind(this) }
          placeholder='Write a comment...'
          value={ this.state.body }
          ref={ this.setRef }
        ></textarea>
      </form>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);
