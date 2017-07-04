json.extract! user, :first_name, :last_name, :email, :id
json.name user.name
json.profilePicUrl asset_path(user.profile_pic.url)
