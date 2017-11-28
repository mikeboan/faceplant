json.extract! user, :first_name, :last_name, :email, :id
json.name user.name

if !!user.profile_pic
  json.profilePicUrl asset_path(user.profile_pic.url)
else
  json.profilePicUrl Photo::DEFAULT_PROFILE_PIC_URL
