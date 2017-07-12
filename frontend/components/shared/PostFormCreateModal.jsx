import React from 'react';

import PostForm from './PostFormContainer';

class PostFormCreateModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      focused: false
    };
  }

  render() {

    return (
      <div className='post-form'>
        <div
          className={ this.state.focused ? 'modal-screen' : 'hidden'}
          onClick={ () => this.setState({ focused: false }) }
        ></div>
        <div className={ this.state.focused ? 'modal-content' : '' }
          onClick={ () => this.setState({ focused: true }) }
        >
          <PostForm success={ this.setState.bind(this, { focused: false }) } />
        </div>
      </div>
    );
  }
}

export default PostFormCreateModal;
