if users.empty?
  Hash.new
else
  users.each do |user|
    json.set! user.id do
      json.partial! 'api/users/user', user: user
    end
  end
end
