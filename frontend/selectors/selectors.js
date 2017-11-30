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

export const selectItemLikers = (state, itemId, itemType) => {
  const item = state[itemType + 's'].byId[itemId] || {};
  return item.likers.map(userId => state.users.byId[userId]);
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

export const generateContent = (field, profile) => {
  const content = profile[field];

  switch (field) {
    case 'hometown':
      return `From ${content}`;
    case 'location':
      return `Lives in ${content}`;
    case 'workplace':
      return `Works at ${content}`;
    case 'school':
      return `Attended ${content}`;
  }
};

export const selectUserSearchResults = ({ users, search }) => (
  search.users.map(id => users.byId[id]) || []
)
