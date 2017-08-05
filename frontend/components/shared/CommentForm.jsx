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
  }

  handleUpdate(field) {
    return (e) => {
      e.preventDefault();
      this.setState({ [field]: e.currentTarget.value });
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    const { commentableType, commentableId } = this.props;
    const comment = Object.assign(
      { commentable_type: commentableType, commentable_id: commentableId },
      this.state
    );
    this.props.postComment(comment).then(() => this.setState({ body: "" }));
  }

  render() {
    return (
      <form onSubmit={ this.handleSubmit.bind(this) } className='post-comment-form'>
        <img src={ this.props.currentUser.profilePicUrl }></img>
        <input type='text'
          id={`post-${this.props.postId}`}
          onChange={ this.handleUpdate('body')}
          placeholder='Write a comment...'
          value={ this.state.body }
        ></input>
      </form>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);
