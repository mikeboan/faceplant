json.extract! user, :first_name, :last_name, :email, :id
json.name user.name
json.profilePicUrl user.profile_pic&.url || Photo::DEFAULT_PROFILE_PIC_URL
