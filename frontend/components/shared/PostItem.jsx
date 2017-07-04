import React from 'react';
import { connect } from 'react-redux';

import { selectUser } from '../../selectors/selectors';

const mapStateToProps = (state, ownProps) => {
  const { user_id } = ownProps.post;
  
  return {
    user: selectUser(state, user_id)
  };
};

const PostItem = ({ post, user }) => (
  <li>
    { user.first_name } { user.last_name }:
    { post.content }
  </li>
);

export default connect(mapStateToProps)(PostItem);
