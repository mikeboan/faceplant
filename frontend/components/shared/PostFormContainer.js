import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import PostForm from './PostForm';
import { selectCurrentUser, selectUser } from '../../selectors/selectors';
import { postPost } from '../../redux/modules/posts';

const mapStateToProps = (state, ownProps) => ({
  currentUser: selectCurrentUser(state),
  profileOwner: selectUser(state, ownProps.match.params.userId)
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  submitPost: (post, profileUserId) => dispatch(postPost(post, profileUserId)).then(() => ownProps.success())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostForm));
