import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { selectUser } from '../../selectors/selectors';

const mapStateToProps = (state, ownProps) => {
  const { user_id } = ownProps.post;

  return {
    user: selectUser(state, user_id),
    currentUser: state.session.currentUser
  };
};

class PostItem extends React.Component {

  editNav() {
    return (
      <nav>
        <i className="fa fa-pencil" aria-hidden="true"></i>
        <i className="fa fa-trash" aria-hidden="true"></i>
      </nav>
    );
  }

  render() {
    const { post, user, currentUser } = this.props;
    const timeAgo = moment(post.created_at, "YYYYMMDD").calendar();

    return (
      <li className='post-item'>
        <div className='post-header'>
          <div className='info'>
            <a href={`profiles/${user.id}`}>
              <img
                className='profile-pic-thumbnail'
                src={user.profilePicUrl}
                />
            </a>
            <div className='metadata'>
              <a href={`profiles/${user.id}`}>{ user.name }</a>
              <time>{ timeAgo }</time>
            </div>
          </div>
          { user.id === currentUser.id ? this.editNav() : "" }
        </div>
        <div className='post-contents'>
          { post.content }
        </div>
      </li>
    )
  }
}

export default connect(mapStateToProps)(PostItem);
