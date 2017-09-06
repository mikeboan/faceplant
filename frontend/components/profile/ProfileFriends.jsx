import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { selectProfileFriends } from '../../selectors/selectors';
import FriendListItem from './FriendListItem';

const mapStateToProps = (state, ownProps) => ({
  friends: selectProfileFriends(state, parseInt(ownProps.match.params.userId))
});

const mapDispatchToProps = (dispatch, ownProps) => ({

});

const ProfileFriends = ({ friends }) => (
  <section className='profile-friends'>
    <h2>Friends</h2>

    <ul>
      {
        friends.map( friend => (
          <li className='friend-item'>

            <Link to={ `/profiles/${friend.id}` }>
              <img src={ friend.profilePicUrl }></img>
              <span>{ friend.name }</span>
            </Link>

            <button onClick={ e => e.preventDefault() }>
              ToDo: Friend Req
            </button>

          </li>
        ))
      }
    </ul>
  </section>
);

export default connect(mapStateToProps, mapDispatchToProps)(ProfileFriends);
