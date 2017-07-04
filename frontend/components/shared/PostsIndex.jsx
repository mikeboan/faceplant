import React from 'react';

import PostIten from './PostItem';

class PostsIndex extends React.Component {
  render() {
    return(
      <div className='posts-index'>
        I'm the posts index
        {
          [1,2,3,4].forEach( post => <PostItem post={ {content: post} } />)
        }
      </div>
    );
  }
}

export default PostsIndex;
