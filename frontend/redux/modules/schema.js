import { schema } from 'normalizr';

export const likeSchema = new schema.Entity('likes');

export const userSchema = new schema.Entity('users', {
  newsfeedPosts: [ postSchema ]
});
export const friendsSchema = new schema.Array(userSchema);
userSchema.define({ friends: friendsSchema });

export const commentSchema = new schema.Entity('comments', {
  author: userSchema,
  repliers: [ userSchema ],
  likers: [ userSchema ],
  likes: [ likeSchema ]
});
export const repliesSchema = new schema.Array(commentSchema);
commentSchema.define({ replies: repliesSchema });

export const postSchema = new schema.Entity('posts', {
  comments: [ commentSchema ],
  profileUser: userSchema,
  user: userSchema,
  likes: [ likeSchema ]
});

export const profileSchema = new schema.Entity('profiles', {
  timelinePosts: [ postSchema ],
  user: userSchema,
}, {
  idAttribute: 'user_id'
});
