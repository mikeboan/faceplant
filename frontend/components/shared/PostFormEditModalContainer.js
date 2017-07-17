import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import PostForm from './PostForm';
import { selectUser, selectCurrentUser } from '../../selectors/selectors';
import { editPost } from '../../redux/modules/posts';
import { hideModal } from '../../redux/modules/modal';

const mapStateToProps = (state, ownProps) => ({
  currentUser: selectCurrentUser(state),
  profileOwner: selectUser(state, ownProps.match.params.userId)
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  submitPost: (post) => dispatch(editPost(post)).then(() => dispatch(hideModal()))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostForm));
