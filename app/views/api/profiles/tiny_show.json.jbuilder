json.extract! @profile, *@profile.attributes.keys - [:created_at, :updated_at, :cover_photo_id]

json.partial! 'api/profiles/cover_photo', profile: @profile

json.user do
  json.partial! 'api/users/user', user: @profile.user
end
