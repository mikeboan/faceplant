import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { selectTimelinePosts } from '../../selectors/selectors';
import PostItem from '../shared/PostItem';
import PostsIndex from '../shared/PostsIndex';

const Timeline = ({ posts }) => {return(
  <ul className='timeline'>
    {
      posts.map( post => (
        <PostItem post={post} />
      ))
    }
  </ul>
)};


const mapStateToProps = (state, ownProps) => {
  const { userId } = ownProps.match.params;

  return {
    posts: selectTimelinePosts(state, userId)
  };
};

export default withRouter(connect(mapStateToProps)(Timeline));
