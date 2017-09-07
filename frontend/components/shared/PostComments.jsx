import React from 'react';
import { connect } from 'react-redux';

import { nestComments, selectUser, selectCurrentUser } from '../../selectors/selectors';
import Comments from './Comments';

const mapStateToProps = (state, { post }) => {
  return {
    comments: nestComments(state, post),
    currentUser: selectCurrentUser(state)
  };
};

export default connect(mapStateToProps)(Comments);
