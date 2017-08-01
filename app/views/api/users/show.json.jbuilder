json.partial! 'api/users/user', user: @user

# json.newfeedPosts do
#   @user.newsfeed_posts.each do |post|
#     json.set! post.id do
#       json.partial! 'api/posts/post', post: post
#     end
#   end
# end

# json.partial! 'api/users/friends', friends: @user.friends

json.friends @user.friends,
  partial: 'api/users/user',
  as: :user
