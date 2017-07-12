import React from 'react';

class PostForm extends React.Component {
  constructor(props) {
    super(props);
    const { post } = props;

    this.state = {
      content: post ? post.content : "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
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
      this.props.post,
      this.state,
      { user_id: this.props.currentUser.id }
    );

    this.props.submitPost(post, this.props.match.params.userId)
      .then(() => {
        if (this._isMounted) this.setState({ content: "" });
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { currentUser } = this.props;

    return (
      <div className='post-form-container'>
        <nav>
          <a>
            <img src={window.staticImages.pencil}></img>
            Post
          </a>
          <a>
            <img src={window.staticImages.camera}></img>
            Photo
          </a>
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
    );
  }
}

export default PostForm;
