import React from 'react';
import { connect } from 'react-redux';

import { selectFriends } from '../../selectors/selectors';
import GenericCard from './GenericCard';
import FriendListItem from './FriendListItem';

const mapStateToProps = (state, { user }) => {
  const friends = selectFriends(state, user);

  const listItems = friends.length > 0
    ? friends.map(
      friend => <FriendListItem key={ friend.id } friend={friend} />
    )
    : [<li key={1}>{"Use the search bar to find your friends!"}</li>];

  return {
    cardName: "Friends",
    cardIcon: window.staticImages.friendsBubble,
    additionalHeaderContent: friends.length,
    listItems
  };
};

export default connect(mapStateToProps)(GenericCard);
