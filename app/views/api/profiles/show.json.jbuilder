json.extract! @profile, *@profile.attributes.keys - [:created_at, :updated_at, :cover_photo_id]

json.coverPhotoUrl @profile.cover_photo.url

user = @profile.user
json.user do
  json.partial! 'api/users/user', user: user

  # json.friends Hash.new
  # json.friends do
  #   json.partial! 'api/users/friends', friends: user.friends
  # end

  json.friends user.friends,
    partial: 'api/users/user',
    as: :user
end

# json.timeline_posts do
#   @timeline_posts.each do |post|
#     json.set! post.id do
#       json.partial! 'api/posts/post', post: post
#     end
#   end
# end

json.timelinePosts @timeline_posts,
  partial: 'api/posts/post',
  as: :post

# json.timeline_post_ids @timeline_posts.map { |post| post.id }
