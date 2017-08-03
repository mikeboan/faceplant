json.extract! comment, :id, :body, :commentable_id, :commentable_type, :author_id

json.author do
  json.partial! 'api/users/user', user: comment.author
end

json.likers comment.likers,
  partial: 'api/users/user',
  as: :user

json.likes comment.likes,
  partial: 'api/likes/like',
  as: :like
