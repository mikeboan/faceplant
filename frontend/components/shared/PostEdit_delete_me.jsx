import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import PostForm from './PostForm';
import { selectCurrentUser } from '../../selectors/selectors';
import { postPost } from '../../redux/modules/posts';

const mapStateToProps = (state) => ({
  currentUser: selectCurrentUser(state)
});

const mapDispatchToProps = (dispatch, { type }) => ({
  postPost: (post, profileUserId) => dispatch(postPost(post, profileUserId))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostForm));


class PostForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      body: "",
      focused: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUpdate(fieldType) {
    return (e) => {
      e.preventDefault();
      this.setState({ [fieldType]: e.currentTarget.value });
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    const post = Object.assign(
      {},
      this.state,
      { author_id: this.props.currentUser.id }
    );
    this.props.postPost(post, this.props.match.params.userId)
      .then(() => this.setState({ body: "", focused: false }));
  }

  render() {
    const { currentUser } = this.props;

    return (
      <div className='post-form'>
        <div
          className={ this.state.focused ? 'modal-screen' : 'hidden'}
          onClick={ () => this.setState({ focused: false }) }
          ></div>
        <div className={ this.state.focused ? 'post-form-container modal-content' : 'post-form-container' }
          onClick={ () => this.setState({ focused: true }) }
        >
          <nav>
            <div>Post</div>
            <div>Photo</div>
          </nav>

          <div>
            <img
              className='profile-pic-thumbnail'
              src={ currentUser.profilePicUrl }>
            </img>

            <form onSubmit={ this.handleSubmit }>
              <textarea
                placeholder={ `Write something to ${currentUser.first_name}` }
                onChange={ this.handleUpdate('body') }
                value={ this.state.body }
                ></textarea>
              <input type='submit' value="Post"></input>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default PostForm;
