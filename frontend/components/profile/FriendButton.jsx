import React from 'react';
import { connect } from 'react-redux';

import { friendStatusWithCurrentUser } from '../../selectors/selectors.js';

const mapStateToProps = (state, { currentUser, user }) => {
  const propsByStatus = {
    none: { disabled: false, buttonText: "Add Friend"},
    accepted: { disabled: false, buttonText: "Remove Friend"},
    requested: { disabled: true, buttonText: "Pending..."},
    pending: { disabled: false, buttonText: "Accept Request"},
    rejected: { disabled: false, buttonText: "Add Friend"},
  }
  debugger
  const friendStatus = friendStatusWithCurrentUser(currentUser, user.id);

  return propsByStatus[friendStatus];
}

const mapDispatchToProps = (dispatch, { currentUser, user }) => {
  const addFriend = () => console.log('add friend');
  const removeFriend = () => console.log('remove friend');
  const acceptFriend = () => console.log('accept friend');

  const actionsByStatus = {
    none: addFriend,
    accepted: removeFriend,
    requested: () => ({}),
    pending: acceptFriend,
    rejected: addFriend
  };

  const friendStatus = friendStatusWithCurrentUser(currentUser, user.id);
  debugger

  return { buttonAction: () => dispatch(actionsByStatus[friendStatus]) };
};

const FriendButton = ({ buttonText, buttonAction, disabled }) => (
  <button
    className="friend-button"
    onClick={ (e) => { e.preventDefault; buttonAction() } }
  >
    { buttonText }
  </button>
);

export default connect(mapStateToProps, mapDispatchToProps)(FriendButton);
