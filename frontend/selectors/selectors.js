export const selectTimelinePosts = (state, userId) => {
  const { posts } = state;
  const profile = state.profiles.byUserId[userId];

  if (!profile) return [];
  return profile.timelinePosts.map( id => posts.byId[id] );
};

export const selectUser = (state, userId) =>
  state.users.byId[userId] || {};

export const selectUsers = (state, userIds) =>
  userIds.map(id => selectUser(state, id));

export const selectCurrentUser = ({ session, users }) =>
  session.currentUser || {};

export const selectProfile = (state, userId) => state.profiles.byUserId[userId] || {};

export const selectFriends = ({ users }, { friends }) => (
  friends ? friends.slice(0, 9).map(id => users.byId[id]) : []
);

export const selectPostComments = ({ comments }, post) => (
  post.comments.map(id => comments.byId[id])
);

export const selectCommentLikers = ({ users, comments }, commentId) => {
  const comment = comments.byId[commentId] || {};
  return comment.likers.map(userId => users.byId[userId]);
};

export const currentUserLikesItem = (state, itemId, itemType) => {
  const item = state[itemType + 's'].byId[itemId];
  return item.likers.includes(state.session.currentUser.id);
};

export const nestComments = (state, { replyIds }) => replyIds.map(id => {
  const comment = state.comments.byId[id];

  return Object.assign({}, comment, {
    replies: nestComments(state, comment),
    author: selectUser(state, comment.author_id),
  });
});

export const friendStatusWithCurrentUser = (currentUser, userId) => {
  if (currentUser.acceptedFriends.includes(userId)) return "accepted";
  if (currentUser.outPendingFriends.includes(userId)) return "requested";
  if (currentUser.inPendingFriends.includes(userId)) return "pending";
  if (currentUser.rejectedFriends.includes(userId)) return "rejected";

  return "none"
};

export const dropdownOpen = ({ dropdowns }, name) => Boolean(dropdowns[name]);

export const selectProfileFriends = (state, userId) => {
  const profile = selectProfile(state, userId);
  if (!Boolean(profile.friends)) return [];
  return selectUsers(state, profile.friends) || [];
};
