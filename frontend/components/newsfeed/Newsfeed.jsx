import React from 'react';
import { connect } from 'react-redux';

import { fetchNewsfeedPosts } from '../../redux/modules/posts';
import PostItem from '../shared/PostItem';
import PostForm from '../shared/NewsFeedPostFormContainer';
import LeftBar from './LeftBar';
import RightBar from './RightBar';

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
      <section className="newsfeed">
        <LeftBar />

        <div className='newsfeed-center'>
          <PostForm />

          <ul>
            {
              this.props.posts.reverse().map( post => <PostItem post={post} /> )
            }
          </ul>
        </div>

        <RightBar />
      </section>
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Newsfeed);
