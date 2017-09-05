user = @user if @user


json.partial! 'api/users/user', user: user

json.acceptedFriends user.accepted_friends,
  partial: 'api/users/user',
  as: :user

# don't show that other users have rejected current user's request
json.outPendingFriends user.requested_pending_friends + user.requested_rejected_friends,
  partial: 'api/users/user',
  as: :user

json.inPendingFriends user.received_pending_friends,
  partial: 'api/users/user',
  as: :user

json.rejectedFriends user.received_rejected_friends,
  partial: 'api/users/user',
  as: :user
