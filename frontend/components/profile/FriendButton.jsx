import React from 'react';
import { connect } from 'react-redux';

import { friendStatusWithCurrentUser, dropdownOpen } from '../../selectors/selectors.js';
import {
  postFriendship,
  destroyFriendship,
  updateFriendship
} from '../../redux/modules/users';
import { showDropdown, hideDropdown } from '../../redux/modules/dropdowns';

const mapStateToProps = (state, { currentUser, user }) => {
  const propsByStatus = {
    none: { disabled: false, buttonText: "Add Friend"},
    accepted: { disabled: false, buttonText: "Remove Friend"},
    requested: { disabled: true, buttonText: "Pending..."},
    pending: { disabled: false, buttonText: "Respond to Request"},
    rejected: { disabled: false, buttonText: "Add Friend"},
  }

  const friendStatus = friendStatusWithCurrentUser(currentUser, user.id);
  console.log(dropdownOpen, showDropdown, hideDropdown);
  return {
    friendStatus,
    propsByStatus,
    visible: dropdownOpen(state, 'friend-request')
  };
}

const mapDispatchToProps = (dispatch, { currentUser, user }) => ({
  actionsByStatus: {
    none: () => dispatch(postFriendship(user.id)),
    accepted: () => dispatch(destroyFriendship(user.id)),
    requested: () => ({}),
    pending: status => dispatch(updateFriendship(user.id, status)),
    rejected: () => dispatch(postFriendship(user.id)),
  },
  showDropdown: () => dispatch(showDropdown('friend-request')),
  hideDropdown: () => dispatch(hideDropdown('friend-request')),
});

const FriendButton = ({ friendStatus, propsByStatus, actionsByStatus, visible, showDropdown, hideDropdown }) => {

  if (friendStatus === 'pending') {
    const clickAction = e => {
      e.preventDefault();
      e.stopPropagation();

      if (visible) hideDropdown();
      else showDropdown();
    }

    return (
      <button
        className="friend-button"
        onClick={ clickAction }
        disabled={ propsByStatus[friendStatus].disabled }
      >
        { propsByStatus[friendStatus].buttonText }
        <ul className={ visible ? "friend-request-dd shadow" : "hidden" }>
          <li onClick={ () => actionsByStatus[friendStatus]('accepted') }>
            Accept Request
          </li>
          <li onClick={ () => actionsByStatus[friendStatus]('rejected') }>
            Reject Request
          </li>
        </ul>
      </button>
    );
  } else {
    return (
      <button
        className="friend-button"
        onClick={ (e) => { e.preventDefault; actionsByStatus[friendStatus](); } }
        disabled={ propsByStatus[friendStatus].disabled }
      >
        { propsByStatus[friendStatus].buttonText }

      </button>
    );
  }
};

// const FriendButton = ({ friendStatus, propsByStatus, actionsByStatus }) => (
//
// );

export default connect(mapStateToProps, mapDispatchToProps)(FriendButton);
