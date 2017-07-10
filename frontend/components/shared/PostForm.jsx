import React from 'react';

class PostForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
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
      { user_id: this.props.currentUser.id }
    );
    this.props.postPost(post, this.props.match.params.userId)
      .then(() => this.setState({ content: "", focused: false }));
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
                onChange={ this.handleUpdate('content') }
                value={ this.state.content }
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
