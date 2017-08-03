export const selectTimelinePosts = (state, userId) => {
  const { posts } = state;
  const profile = state.profiles.byUserId[userId];

  if (!profile) return [];
  return profile.timelinePosts.map( id => posts.byId[id] );
};

export const selectUser = (state, userId) => state.users.byId[userId] || {};
export const selectUsers = (state, userIds) => userIds.map(id => selectUser(state, id));
export const selectCurrentUser = ({ session }) => session.currentUser || {};

export const selectFriends = ({ users }, { friends }) => (
  friends ? friends.slice(0, 9).map(id => users.byId[id]) : []
);

export const selectPostComments = ({ comments }, post) => (
  post.comments.map(id => comments.byId[id])
  // Object.keys(comments.byId)
  //   .map(id => comments.byId[id])
  //   .filter(comment => comment.commentable_id == postId &&
  //     comment.commentable_type === "Post"
  //   )
);

export const selectCommentLikers = ({ users, comments }, commentId) => {
  const comment = comments.byId[commentId] || {};
  return comment.likers.map(userId => users.byId[userId]);
};

export const currentUserLikesComment = (state, commentId) => {
  const comment = state.comments.byId[commentId];
  return comment.likers.includes(state.session.currentUser.id);
};
