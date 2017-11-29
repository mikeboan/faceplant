json.users do
  json.array! @users, partial: 'api/users/user', as: :user
end
