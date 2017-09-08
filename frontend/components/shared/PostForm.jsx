import React from 'react';

class PostForm extends React.Component {
  constructor(props) {
    super(props);
    const { item } = props;
    this.state = {
      body: item ? item.body : "",
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
    const item = Object.assign(
      {},
      this.props.item,
      this.state,
      { author_id: this.props.currentUser.id }
    );
    delete item.author;
    
    this.props.submitItem(item, this.props.match.params.userId)
      .then(() => {
        if (this._isMounted) this.setState({ body: "" });
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { currentUser, profileOwner } = this.props;

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

        <form onSubmit={ this.handleSubmit }>
          <div>
            <img
              className='profile-pic-thumbnail'
              src={ currentUser.profilePicUrl }>
            </img>
            <textarea
              placeholder={ `Write something to ${profileOwner.first_name || "..."}` }
              onChange={ this.handleUpdate('body') }
              value={ this.state.body }
            ></textarea>
          </div>

          <input type='submit' value="Post"></input>
        </form>
      </div>
    );
  }
}

export default PostForm;
