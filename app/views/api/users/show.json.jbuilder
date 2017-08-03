json.partial! 'api/users/user', user: @user

json.friends @user.friends,
  partial: 'api/users/user',
  as: :user
