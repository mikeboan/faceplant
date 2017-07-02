json.extract! @profile, *@profile.attributes.keys - [:created_at, :updated_at, :cover_photo_id]

json.coverPhotoUrl @profile.cover_photo.url

json.user do
  json.partial! 'api/users/user', user: @profile.user
end

json.timeline_posts do
  @profile.timeline_posts.each do |post|
    json.set! post.id do
      json.partial! 'api/posts/post', post: post
    end
  end
end
