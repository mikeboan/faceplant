json.extract! comment, :id, :body, :commentable_id, :commentable_type, :author_id

json.author do
  json.partial! 'api/users/user', user: comment.author
end

json.likeCount comment.likers.count

json.likers do
  json.partial! 'api/users/users', users: comment.likers
end
