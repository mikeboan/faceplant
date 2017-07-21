import React from 'react';
import { connect } from 'react-redux';

import { selectFriends } from '../../selectors/selectors';
import FriendListItem from './FriendListItem';

const mapStateToProps = (state, { user }) => ({
  friends: selectFriends(state, user)
});

const FriendsCard = ({ user, friends }) => (
  <section className='friends-card card'>
    <header>
      <img src={ window.friendsBubble }></img>
      <h2>Friends</h2>
    </header>
    <ul>
      {
        friends.map( friend => <FriendListItem key={ friend.id } friend={friend} /> )
      }
    </ul>
  </section>
);

export default connect(mapStateToProps)(FriendsCard);
