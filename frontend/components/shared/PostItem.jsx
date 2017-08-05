import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { selectUser } from '../../selectors/selectors';
import PostNav from './PostNav';
import PostComments from './PostComments';
import CommentForm from './CommentForm';

const mapStateToProps = (state, ownProps) => {
  const { user_id, profileUserId } = ownProps.post;

  return {
    user: selectUser(state, user_id),
    profileUser: selectUser(state, profileUserId),
    currentUser: state.session.currentUser
  };
};

const PostItem = ({ post, user, profileUser, currentUser }) => {
  const timeAgo = moment(post.created_at, "YYYYMMDD").calendar();

  return (
    <li className='post-item shadow'>
      <div className='post-item-contents'>
        <div className='post-header'>
          <div className='info'>
            <Link to={`/profiles/${user.id}`}>
              <img
                className='profile-pic-thumbnail'
                src={user.profilePicUrl}
                />
            </Link>
            <div className='metadata'>
              <div className='byline'>
                <Link to={`/profiles/${user.id}`}>{ user.name }</Link>
                {
                  profileUser.id === user.id ?
                    "" :
                    [<span key='span-1'>{" > "}</span>, <Link key='link-1' to={`/profiles/${profileUser.id}`}>{ profileUser.name }</Link>]
                }
              </div>
              <time>{ timeAgo }</time>
            </div>
          </div>
          {
            user.id === currentUser.id ?
              <PostNav post={ post }/> :
              null
          }
        </div>
        <div className='post-contents'>
          { post.content }
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
