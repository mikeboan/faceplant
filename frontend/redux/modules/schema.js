import { schema } from 'normalizr';

export const likeSchema = new schema.Entity('likes');

export const userSchema = new schema.Entity('users', {
  newsfeedPosts: [ postSchema ],

});
export const friendsSchema = new schema.Array(userSchema);

[
  'friends',
  'acceptedFriends',
  'inPendingFriends',
  'outPendingFriends',
  'rejectedFriends'
].forEach( key => userSchema.define({ [key]: friendsSchema }) );

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
  author: userSchema,
  likes: [ likeSchema ],
  likers: [ userSchema ]
});
export const newsfeedSchema = new schema.Entity('newsfeed', {
  newsfeedPosts: [ postSchema ]
});

export const profileSchema = new schema.Entity('profiles', {
  timelinePosts: [ postSchema ],
  user: userSchema,
  friends: [ userSchema ]
}, {
  idAttribute: 'user_id'
});

export const searchSchema = new schema.Entity('search', {
  users: [ userSchema ]
});
