json.extract! comment, :body, :commentable_id, :commentable_type, :author_id

json.author do
  json.partial! 'api/users/user', user: comment.author
end
