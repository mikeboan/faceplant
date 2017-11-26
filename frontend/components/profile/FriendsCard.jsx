import React from 'react';
import { connect } from 'react-redux';

import { selectFriends } from '../../selectors/selectors';
import GenericCard from './GenericCard';
import FriendListItem from './FriendListItem';

const mapStateToProps = (state, { user }) => {
  const friends = selectFriends(state, user);

  return {
    cardName: "Friends",
    cardIcon: window.staticImages.friendsBubble,
    additionalHeaderContent: friends.length,
    listItems: friends.map(
      friend => <FriendListItem key={ friend.id } friend={friend} />
    )
  };
};

export default connect(mapStateToProps)(GenericCard);
