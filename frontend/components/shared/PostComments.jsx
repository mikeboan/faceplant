import React from 'react';
import { connect } from 'react-redux';

import { nestComments, selectUser } from '../../selectors/selectors';
import Comments from './Comments';

const mapStateToProps = (state, { post }) => {
  const comments = nestComments(state, post);
  // const users = {};
  // comments.forEach( ({ author_id }) => {
  //   Object.assign(users, { [author_id]: selectUser(state, author_id) });
  // });

  return { comments };
};

export default connect(mapStateToProps)(Comments);
