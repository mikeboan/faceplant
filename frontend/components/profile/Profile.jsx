import React from 'react';
import { connect } from 'react-redux';
import { fetchProfile } from '../../redux/modules/profiles';

import ProfileHeader from './ProfileHeader';
import Timeline from './Timeline';
import InfoCard from './InfoCard';
import FriendsCard from './FriendsCard';
import PhotosCard from './PhotosCard';
import PostFormCreateModal from '../shared/PostFormCreateModal';
import PostsIndex from '../shared/PostsIndex';

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
    const profile = this.props.profile || {};

    return (
      <section className='profile'>
        <ProfileHeader user={ user } profile={ profile} />
        <div className='profile-contents'>
          <div className='left'>
            <InfoCard />
            <FriendsCard />
            <PhotosCard />
          </div>
          <div className='right'>
            <PostFormCreateModal />
            <Timeline />
          </div>
        </div>
      </section>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
