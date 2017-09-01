import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';

import { fetchProfile } from '../../redux/modules/profiles';
import ProfileHeader from './ProfileHeader';
import ProfileAbout from './ProfileAbout';
import ProfileFriends from './ProfileFriends';
import ProfilePhotos from './ProfilePhotos';
import Timeline from './Timeline';


const mapStateToProps = ({ users, profiles, session: { currentUser } }, ownProps) => {
  const userId = ownProps.match.params.userId;

  return {
    user: users.byId[userId] || {},
    profile: profiles.byUserId[userId] || {},
    currentUser
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchProfile: (userId) => dispatch(fetchProfile(userId))
});


class Profile extends React.Component {
  componentDidMount() {
    if (!Boolean(this.props.profile.user_id)) {
      this.props.fetchProfile(this.props.match.params.userId);
    }
  }

  componentWillReceiveProps(newProps) {
    const oldId = this.props.profile.user_id;
    const newId = parseInt(newProps.match.params.userId);
    if (oldId !== newId) this.props.fetchProfile(newId);
  }

  render() {
    const { currentUser, user, profile } = this.props;

    return (
      <section className='profile'>
        <ProfileHeader currentUser={currentUser} user={ user } profile={ profile } />
        <div className='profile-contents'>
          <Route
            exact path="/profiles/:userId"
            render={ props => <Timeline user={ user } {...props} /> }
          />
          <Route path="/profiles/:userId/about" component={ ProfileAbout } />
          <Route path="/profiles/:userId/friends" component={ ProfileFriends } />
          <Route path="/profiles/:userId/photos" component={ ProfilePhotos } />
        </div>
      </section>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile));
