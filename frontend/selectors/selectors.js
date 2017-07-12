export const selectTimelinePosts = (state, userId) => {
  const { posts } = state;
  const profile = state.profiles.byUserId[userId];
  
  if (!profile) return [];
  return profile.timelinePosts.map( id => posts.byId[id] );
};

export const selectUser = (state, userId) => state.users.byId[userId] || {};
export const selectCurrentUser = ({ session }) => session.currentUser || {};
