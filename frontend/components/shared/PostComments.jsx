import React from 'react';
import { connect } from 'react-redux';

import { nestComments, selectUser } from '../../selectors/selectors';
import Comments from './Comments';

const mapStateToProps = (state, { post }) => {
  return { comments: nestComments(state, post) };
};

export default connect(mapStateToProps)(Comments);
