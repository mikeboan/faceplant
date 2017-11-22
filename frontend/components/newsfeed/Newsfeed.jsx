import React from 'react';
import { connect } from 'react-redux';

import { fetchNewsfeedPosts } from '../../redux/modules/posts';
import PostItem from '../shared/PostItem';

const mapStateToProps = (state, ownProps) => ({
  posts: Object.values(state.posts.byId)
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchNewsfeedPosts: () => dispatch(fetchNewsfeedPosts())
});

class Newsfeed extends React.Component {

  componentDidMount() {
    this.props.fetchNewsfeedPosts();
  }

  render() {
    return(
      <ul>
        {
          this.props.posts.map( post => <PostItem post={post} /> )
        }
      </ul>
    )
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Newsfeed);
