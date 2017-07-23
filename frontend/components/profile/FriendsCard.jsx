import React from 'react';
import { connect } from 'react-redux';

import { selectFriends } from '../../selectors/selectors';
import GenericCard from './GenericCard';
import FriendListItem from './FriendListItem';

const mapStateToProps = (state, { user }) => ({
  cardName: "Friends",
  cardIcon: window.friendsBubble,
  listItems: selectFriends(state, user).map(
    friend => <FriendListItem key={ friend.id } friend={friend} />
  ),
});

// const FriendsCard = ({ user, friends }) => (
//   <section className='friends-card card'>
//     <header>
//       <img src={ window.friendsBubble }></img>
//       <h2>Friends</h2>
//     </header>
//     <ul>
//       {
//         friends
//       }
//     </ul>
//   </section>
// );

export default connect(mapStateToProps)(GenericCard);
