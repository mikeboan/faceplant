json.extract! @post, *@post.attributes.keys

json.user do
  json.partial! 'api/users/user', user: @post.user
end
