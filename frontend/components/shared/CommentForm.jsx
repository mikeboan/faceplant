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

  componentDidMount() {
    // this.input.focus();
    // const top = this.input.getBoundingClientRect().top;
    // const bodyTop = document.body.getBoundingClientRect().top;
    // const scrollPos = top - bodyTop - (window.innerHeight / 2);
    // window.scrollTo(0, scrollPos);
  }

  handleUpdate(field) {
    return (e) => {
      e.preventDefault();
      this.setState({ [field]: e.currentTarget.value });
    };
  }

  handleSubmit(e) {
    e.preventDefault();
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
      .then(this.props.hideCommentForm);
  }

  setRef(input) {
    this.input = input;
    this.props.setCommentRef(input);
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
          ref={ this.setRef }
        ></input>
      </form>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);
