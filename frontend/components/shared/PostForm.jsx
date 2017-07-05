import React from 'react';

class PostForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      contents: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUpdate(fieldType) {
    return (e) => {
      e.preventDefault();
      this.setState( [fieldType]: e.currenTarget.value );
    }
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  render() {
    const { currentUser } = this.props;

    return(
      <div className='post-form-container'>
        <nav>
          <div>Post</div>
          <div>Photo</div>
        </nav>

        <form onSubmit={ this.handleSubmit }>
          <img src={ currentUser.profilePicUrl }></img>
          <textarea
            placeholder={ `Write something to ${currentUser.name}` }
            onChange={ this.handleUpdate('contents') }
          >{ this.state.content }</textarea>
          <input type='submit'>Post</input>
        </form>
      </div>
    );
  }
}

export default PostForm;
