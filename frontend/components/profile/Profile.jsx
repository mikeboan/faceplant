import React from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../../redux/modules/users';

import ProfileHeader from './ProfileHeader';

const mapStateToProps = (state, ownProps) => ({
  user: state.users[ownProps.match.params.userId] || {}
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchUser: (id) => dispatch(fetchUser(id))
});


class Profile extends React.Component {
  componentDidMount() {
    if (!Boolean(this.props.user.id)) {
      this.props.fetchUser(this.props.match.params.userId);
    }
  }

  componentWillReceiveProps(newProps) {
    const oldId = this.props.user.id;
    const newId = newProps.match.params.userId;
    if (oldId !== newId) this.props.fetchUser(newId);
  }

  render() {
    const user = this.props.user || {};
    return (
      <section>
        <ProfileHeader user={user} />
      </section>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
