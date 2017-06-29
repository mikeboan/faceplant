json.extract! user, :first_name, :last_name, :email, :id
json.profilePicUrl asset_path(user.profile_pic.url)
json.coverPhotoUrl asset_path(user.cover_photo.url)
