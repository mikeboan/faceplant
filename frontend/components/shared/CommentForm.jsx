import React from 'react';
import { connect } from 'react-redux';

import { selectCurrentUser } from '../../selectors/selectors';
import { postComment } from '../../redux/modules/comments';

const mapStateToProps = (state, ownProps) => ({
  currentUser: selectCurrentUser(state)
});

const mapDispatchToProps = (dispatch, { postId }) => ({
  postComment: comment => dispatch(postComment(comment, postId))
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
    const { commentableType } = this.props;

    this.props.postComment(
      Object.assign({}, this.state, { commentable_type: commentableType })
    ).then(() => this.setState({ body: "" }));
  }

  render() {
    return (
      <form onSubmit={ this.handleSubmit.bind(this) } className='post-comment-form'>
        <img src={ this.props.currentUser.profilePicUrl }></img>
        <input type='text' onChange={ this.handleUpdate('body')} value={ this.state.body }></input>
      </form>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);
