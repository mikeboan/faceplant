import React from 'react';
import { connect } from 'react-redux';

import { selectUser } from '../../selectors/selectors';
import Comments from './Comments';

const mapStateToProps = (state, comments) => {
  const users = {};
  comments.forEach( ({ author_id }) => {
    Object.assign(users, { [author_id]: selectUser(state, author_id) });
  });

  return { users };
};

export default connect(mapStateToProps)(Comments);
