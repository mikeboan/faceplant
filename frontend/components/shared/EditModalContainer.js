import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import PostForm from './PostForm';
import { selectUser, selectCurrentUser } from '../../selectors/selectors';
import { editPost } from '../../redux/modules/posts';
import { editComment } from '../../redux/modules/comments';
import { hideModal } from '../../redux/modules/modal';
import { hideAllDropdowns } from '../../redux/modules/dropdowns';

const mapStateToProps = (state, ownProps) => ({
  currentUser: selectCurrentUser(state),
  profileOwner: selectUser(state, ownProps.match.params.userId),
  item: ownProps.post || ownProps.comment
});

const mapDispatchToProps = (dispatch, { type }) => {
  const editAction = type === 'post' ? editPost : editComment;

  return ({
    submitItem: (item) => dispatch(editAction(item))
      .then(() => dispatch(hideModal()))
      .then(() => dispatch(hideAllDropdowns()))
  });
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostForm));
