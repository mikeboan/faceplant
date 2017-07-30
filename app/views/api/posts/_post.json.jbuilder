json.extract! post, *post.attributes.keys

json.profileUserId post.profile.user_id

json.user do
  json.partial! 'api/users/user', user: post.user
end

json.profileUser do
  json.partial! 'api/users/user', user: post.profile.user
end

json.comments Hash.new
json.comments do
  json.partial! 'api/comments/comments', comments: post.comments
end

json.likes Hash.new
json.likes do
  json.partial! 'api/likes/likes', likes: post.likes
end
