json.extract! post, *post.attributes.keys

json.profileUserId post.profile.user_id

json.user do
  json.partial! 'api/users/user', user: post.user
end
