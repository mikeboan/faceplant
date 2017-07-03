import React from 'react';
import { connect } from 'react-redux';
import { fetchProfile } from '../../redux/modules/profiles';

import ProfileHeader from './ProfileHeader';

const mapStateToProps = ({ users, profiles }, ownProps) => {
  const userId = ownProps.match.params.userId;
  return {
    user: users.byId[userId] || {},
    profile: profiles.byUserId[userId] || {},
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchProfile: (userId) => dispatch(fetchProfile(userId))
});


class Profile extends React.Component {
  componentDidMount() {
    if (!Boolean(this.props.profile.userId)) {
      this.props.fetchProfile(this.props.match.params.userId);
    }
  }

  componentWillReceiveProps(newProps) {
    const oldId = this.props.profile.user_id;
    const newId = parseInt(newProps.match.params.userId);
    if (oldId !== newId) this.props.fetchProfile(newId);
  }

  render() {
    const user = this.props.user || {};
    const profile = this.props.profile || {}
    debugger
    const profileItems = Object.keys(profile).map(key => (
      <ProfileListItem info={ profile[key] } />
    ));

    return (
      <section>
        <ProfileHeader user={ user } />
        <ul>
          { profileItems }
        </ul>
      </section>
    );
  }
}

const ProfileListItem = ({ info }) => <li>{info}</li>;

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
