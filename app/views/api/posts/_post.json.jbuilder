json.extract! post, *post.attributes.keys

json.profileUserId post.profile.user_id

json.user do
  json.partial! 'api/users/user', user: post.user
end

json.profileUser do
  json.partial! 'api/users/user', user: post.profile.user
end

# json.comments Hash.new
# json.comments do
#   json.partial! 'api/comments/comments', comments: post.comments
# end
#
# json.likes Hash.new
# json.likes do
#   json.partial! 'api/likes/likes', likes: post.likes
# end

# json.comments post.comments do |comment|
#   json.partial! 'api/comments/comment', comment: comment
# end


json.comments post.comments,
  partial: 'api/comments/comment',
  as: :comment

json.likes post.likes,
  partial: 'api/likes/like',
  as: :like
