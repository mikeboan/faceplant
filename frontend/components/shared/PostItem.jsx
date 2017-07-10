import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { selectUser } from '../../selectors/selectors';
import PostNav from './PostNav';

const mapStateToProps = (state, ownProps) => {
  const { user_id } = ownProps.post;

  return {
    user: selectUser(state, user_id),
    currentUser: state.session.currentUser
  };
};

const PostItem = ({ post, user, currentUser }) => {
  const timeAgo = moment(post.created_at, "YYYYMMDD").calendar();

  return (
    <li className='post-item'>
      <div className='post-header'>
        <div className='info'>
          <a href={`profiles/${user.id}`}>
            <img
              className='profile-pic-thumbnail'
              src={user.profilePicUrl}
              />
          </a>
          <div className='metadata'>
            <a href={`profiles/${user.id}`}>{ user.name }</a>
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
    </li>
  );
};

export default connect(mapStateToProps)(PostItem);
