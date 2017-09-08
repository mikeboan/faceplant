import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { selectUser } from '../../selectors/selectors';
import PostNav from './PostNav';
import PostComments from './PostComments';
import CommentForm from './CommentForm';

const mapStateToProps = (state, ownProps) => {
  const { author_id, profileUserId } = ownProps.post;

  return {
    author: selectUser(state, author_id),
    profileUser: selectUser(state, profileUserId),
    currentUser: state.session.currentUser
  };
};

const PostItem = ({ post, author, profileUser, currentUser }) => {
  const timeAgo = moment(post.created_at, "YYYYMMDD").calendar();

  return (
    <li className='post-item'>
      <div className='post-item-contents'>
        <div className='post-header'>
          <div className='info'>
            <Link to={`/profiles/${author.id}`}>
              <div className='thumbnail-container'>
                <img
                  className='profile-pic-thumbnail'
                  src={author.profilePicUrl}
                  />
              </div>
            </Link>
            <div className='metadata'>
              <div className='byline'>
                <Link to={`/profiles/${author.id}`}>{ author.name }</Link>
                {
                  profileUser.id === author.id ?
                    "" :
                    [<span key='span-1'>{" > "}</span>, <Link key='link-1' to={`/profiles/${profileUser.id}`}>{ profileUser.name }</Link>]
                }
              </div>
              <time>{ timeAgo }</time>
            </div>
          </div>
          {
            author.id === currentUser.id ?
              <PostNav item={ post } type={ 'post' }/> :
              null
          }
        </div>
        <div className='post-contents'>
          { post.body }
        </div>
      </div>

      <div className='post-bottom'>
        <div className='post-actions'>Post Actions -- Like, etc.</div>
        <PostComments post={ post } />
        <CommentForm commentableId={ post.id } commentableType={ 'Post' } />
      </div>
    </li>
  );
};

export default connect(mapStateToProps)(PostItem);
