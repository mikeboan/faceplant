import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  selectProfileFriends,
  selectCurrentUser,
  selectUser
} from '../../selectors/selectors';
import FriendListItem from './FriendListItem';
import FriendButton from './FriendButton';

const mapStateToProps = (state, ownProps) => {
  const userId = parseInt(ownProps.match.params.userId);

  return ({
    friends: selectProfileFriends(state, userId),
    currentUser: selectCurrentUser(state),
    user: selectUser(state, userId)
  })
};

class ProfileFriends extends React.Component {
  constructor(props) {
    super(props);
    this.state = { query: "" };
  }

  filteredFriends() {
    return this.props.friends.filter( friend =>
      friend.name.toLowerCase().indexOf(this.state.query.toLowerCase()) !== -1
    );
  }

  assignHandler(name) {
    return e => this.setState({ [name]: e.currentTarget.value });
  }

  render() {
    const { currentUser, user } = this.props;

    return (
      <section className='profile-friends'>
        <nav>
          <h2>Friends</h2>
          <input
            onChange={ this.assignHandler('query') }
            placeholder="Search Friends">
          </input>
        </nav>

        <ul>
          {
            this.filteredFriends().map( friend => (
              <li className='friend-item' key={`friend-${friend.id}`}>

                <Link to={ `/profiles/${friend.id}` }>
                  <img src={ friend.profilePicUrl }></img>
                  <span>{ friend.name }</span>
                </Link>

                <FriendButton currentUser={ currentUser } user={ friend } />
              </li>
            ))
          }
        </ul>
      </section>
    );
  }
}

export default connect(mapStateToProps)(ProfileFriends);
