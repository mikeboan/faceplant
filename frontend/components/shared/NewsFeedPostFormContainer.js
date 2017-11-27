import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import PostForm from './PostForm';
import { selectCurrentUser, selectUser } from '../../selectors/selectors';
import { postPost } from '../../redux/modules/posts';

const mapStateToProps = (state, ownProps) => {
  const currentUser = selectCurrentUser(state);

  return {
    currentUser,
    profileOwner: currentUser,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  submitItem:
    (post, profileUserId) =>
      dispatch(postPost(post, profileUserId))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostForm));
