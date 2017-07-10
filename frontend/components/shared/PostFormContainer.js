import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import PostForm from './PostForm';
import { selectCurrentUser } from '../../selectors/selectors';
import { postPost } from '../../redux/modules/posts';

const mapStateToProps = (state) => ({
  currentUser: selectCurrentUser(state)
});

const mapDispatchToProps = (dispatch) => ({
  postPost: (post, profileUserId) => dispatch(postPost(post, profileUserId))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostForm));
