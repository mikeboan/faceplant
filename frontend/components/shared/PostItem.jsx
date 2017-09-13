import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';

import {
  selectUser,
  selectCurrentUser,
  selectItemLikers,
  currentUserLikesItem
} from '../../selectors/selectors';
import PostNav from './PostNav';
import PostActions from './PostActions';
import PostComments from './PostComments';
import CommentForm from './CommentForm';
import Likers from './Likers';

const mapStateToProps = (state, ownProps) => {
  const { author_id, profileUserId, id } = ownProps.post;

  return {
    author: selectUser(state, author_id),
    profileUser: selectUser(state, profileUserId),
    currentUser: selectCurrentUser(state),
    likers: selectItemLikers(state, id, 'post'),
    likedByCurrentUser: currentUserLikesItem(state, id, 'post'),
  };
};

class PostItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = { commentRef: null };

    this.setCommentRef = this.setCommentRef.bind(this);
    this.focusCommentBox = this.focusCommentBox.bind(this);
  }

  focusCommentBox() {
    if (this.state.commentRef) this.state.commentRef.focus();
  }

  setCommentRef(ref) {
    this.setState({ commentRef: ref });
  }

  render() {
    const { post, author, profileUser, currentUser } = this.props;
    const timeAgo = moment(post.created_at, "YYYYMMDD").calendar(); // NOT WORKING?!

    return (
      <li className='post-item'>
        <div className='post-item-contents'>
          <div className='post-header'>
            <div className='info'>
              <Link to={`/profiles/${author.id}`}>
                <div className='thumbnail-container'>
                  <img
                    className='profile-pic-thumbnail'
                    src={author.profilePicUrl}
                    />
                </div>
              </Link>
              <div className='metadata'>
                <div className='byline'>
                  <Link to={`/profiles/${author.id}`}>{ author.name }</Link>
                  {
                    profileUser.id === author.id ?
                      "" :
                      [<span key='span-1'>{" > "}</span>, <Link key='link-1' to={`/profiles/${profileUser.id}`}>{ profileUser.name }</Link>]
                  }
                </div>
                <time>{ timeAgo }</time>
              </div>
            </div>
            {
              author.id === currentUser.id ?
                <PostNav item={ post } type={ 'post' } /> :
                null
            }
          </div>
          <div className='post-contents'>
            { post.body }
          </div>
          <PostActions postId={ post.id } focusCommentBox={ this.focusCommentBox } />
        </div>

        <div className='post-bottom'>
          {
            this.props.likers.length ?
              <Likers likers={this.props.likers} likedByCurrentUser={this.props.likedByCurrentUser} /> :
              null
          }
          <PostComments post={ post } />
          <CommentForm
            commentableId={ post.id }
            commentableType={ 'Post' }
            setCommentRef={ this.setCommentRef }
          />
        </div>
      </li>
    );
  }
}

export default connect(mapStateToProps)(PostItem);
