import { schema } from 'normalizr';

export const like = new schema.Entity('likes');


export const user = new schema.Entity('users', {
  newsfeedPosts: [ post ]
});

export const friends = new schema.Array(user);

user.define({friends: friends});

export const comment = new schema.Entity('comments', {
  author: user,
  likers: [ user ],
  likes: [ like ]
});

export const post = new schema.Entity('post', {
  comments: [ comment ],
  profileUser: user,
  user: user,
  likes: [ like ]
});

export const profile = new schema.Entity('profile', {
  timelinePosts: [ post ],
  user: user
});
