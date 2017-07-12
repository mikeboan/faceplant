import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import PostForm from './PostForm';
import { selectCurrentUser } from '../../selectors/selectors';
import { postPost } from '../../redux/modules/posts';

const mapStateToProps = (state) => ({
  currentUser: selectCurrentUser(state)
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  postPost: (post, profileUserId) => dispatch(postPost(post, profileUserId)).then(() => ownProps.success())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostForm));
