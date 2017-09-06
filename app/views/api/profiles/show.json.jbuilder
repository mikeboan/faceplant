json.extract! @profile, *@profile.attributes.keys - [:created_at, :updated_at, :cover_photo_id]

json.coverPhotoUrl @profile.cover_photo.url

user = @profile.user
json.user do
  json.partial! 'api/users/user', user: user

  json.friends user.friends,
    partial: 'api/users/user',
    as: :user
end

json.friends user.friends,
  partial: 'api/users/user',
  as: :user

json.timelinePosts @timeline_posts,
  partial: 'api/posts/post',
  as: :post
