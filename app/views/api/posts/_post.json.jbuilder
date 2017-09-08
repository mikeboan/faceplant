json.extract! post, *post.attributes.keys

json.profileUserId post.profile.user_id

json.author do
  json.partial! 'api/users/user', user: post.author
end

json.profileUser do
  json.partial! 'api/users/user', user: post.profile.user
end

json.comments post.comments,
  partial: 'api/comments/comment',
  as: :comment

json.likes post.likes,
  partial: 'api/likes/like',
  as: :like

json.replyIds post.top_level_comment_ids
