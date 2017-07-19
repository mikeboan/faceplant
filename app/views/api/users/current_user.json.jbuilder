json.partial! 'api/users/user', user: @user

friends = @user.friends
if friends.empty?
  json.friends Hash.new
else
  json.friends do
    friends.each do |friend|
      json.set! friend.id do
        json.partial! 'api/users/user', user: friend
      end
    end
  end
end

# I wish...
# json.friends @user.friends.inject({}) { |accum, f| accum.merge(f.id => f) }
