import React from 'react';

class PostForm extends React.Component {
  constructor(props) {
    super(props);
    const { item } = props;
    this.state = {
      body: item ? item.body : "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
  }

  handleUpdate(fieldType) {
    return (e) => {
      e.preventDefault();
      this.autosize(e);
      this.setState({ [fieldType]: e.currentTarget.value });
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    const el = e.target;

    const item = Object.assign(
      {},
      this.props.item,
      this.state,
      { author_id: this.props.currentUser.id }
    );
    delete item.author;

    const userId = this.props.match.params.userId || this.props.currentUser.id;

    this.props.submitItem(item, userId)
      .then(() => {
        if (this._isMounted) this.setState({ body: "" });
        el.style.cssText = 'height:auto;';
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
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
    const { currentUser, profileOwner } = this.props;
    let writeTo;
    if (!profileOwner) {
      writeTo = "to ...";
    } else if (profileOwner.id === currentUser.id) {
      writeTo = "on your wall";
    } else {
      `to ${profileOwner.firstName}`;
    }

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
              placeholder={ `Write something ${writeTo}` }
              onChange={ this.handleUpdate('body') }
              onKeyDown={ this.handleKeyDown }
              value={ this.state.body }
            ></textarea>
          </div>

          <input type='submit' value="Post" />
        </form>
      </div>
    );
  }
}

export default PostForm;
