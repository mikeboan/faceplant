json.extract! comment, :id, :body, :commentable_id, :commentable_type, :author_id

json.author do
  json.partial! 'api/users/user', user: comment.author
end

json.likeCount comment.likers.count

# json.likers Hash.new
# json.likers do
#   json.partial! 'api/users/users', users: comment.likers
# end

# likes as array
json.likers comment.likers do |liker|
  json.partial! 'api/users/user', user: liker
end

json.likes comment.likes do |like|
  json.partial! 'api/likes/like', like: like
end


# json.likes Hash.new
# json.likes do
#   json.partial! 'api/likes/likes', likes: comment.likes
# end
