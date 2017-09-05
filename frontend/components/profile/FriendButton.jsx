import React from 'react';
import { connect } from 'react-redux';

import { friendStatusWithCurrentUser } from '../../selectors/selectors.js';
import {
  postFriendship,
  destroyFriendship,
  updateFriendship
} from '../../redux/modules/users';

const mapStateToProps = (state, { currentUser, user }) => {
  const propsByStatus = {
    none: { disabled: false, buttonText: "Add Friend"},
    accepted: { disabled: false, buttonText: "Remove Friend"},
    requested: { disabled: true, buttonText: "Pending..."},
    pending: { disabled: false, buttonText: "Accept Request"},
    rejected: { disabled: false, buttonText: "Add Friend"},
  }

  const friendStatus = friendStatusWithCurrentUser(currentUser, user.id);

  return { friendStatus, propsByStatus };
}

const mapDispatchToProps = (dispatch, { currentUser, user }) => ({
  actionsByStatus: {
    none: () => dispatch(postFriendship(user.id)),
    accepted: () => dispatch(destroyFriendship(user.id)),
    requested: () => ({}),
    pending: () => dispatch(updateFriendship(user.id, 'accepted')),
    rejected: () => dispatch(postFriendship(user.id)),
  }
});

const FriendButton = ({ friendStatus, propsByStatus, actionsByStatus }) => (
  <button
    className="friend-button"
    onClick={ (e) => { e.preventDefault; actionsByStatus[friendStatus](); } }
    disabled={ propsByStatus[friendStatus].disabled }
  >
    { propsByStatus[friendStatus].buttonText }
  </button>
);

export default connect(mapStateToProps, mapDispatchToProps)(FriendButton);
