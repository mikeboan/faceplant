import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { selectUser } from '../../selectors/selectors';

const mapStateToProps = (state, ownProps) => {
  const { user_id } = ownProps.post;

  return {
    user: selectUser(state, user_id)
  };
};

const PostItem = ({ post, user }) => {
  const timeAgo = moment(post.created_at, "YYYYMMDD").fromNow();

  return (
  <li className='post-item'>
    <div className='post-header'>
      <img
        className='profile-pic-thumbnail'
        src={user.profilePicUrl}
        />
      <div className='metadata'>
        <a href={`profiles/${user.id}`}>{ user.name }</a>
        <time>{ timeAgo }</time>
      </div>
    </div>
    <div className='post-contents'>
      { post.content }
    </div>
  </li>
)};

export default connect(mapStateToProps)(PostItem);
