# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


User.destroy_all

mike = User.create!(first_name: 'Mike', last_name: 'Fake', email: 'mike@fake.com', password: 'starwars')
michael = User.create!(first_name: 'Michael', last_name: 'Bluth', email: 'michael@bluth.com', password: 'starwars')
gob = User.create!(first_name: 'GOB', last_name: 'Bluth', email: 'gob@bluth.com', password: 'starwars')

users = [mike, michael, gob]

Post.destroy_all
p1 = Post.create!(content: "But where did the lighter fluid come from!?", poster_id: gob.id, postee_id: michael.id)


20.times do |i|
  Post.create!(
    content: "Post number #{i}",
    poster_id: users[i % users.length].id,
    postee_id: users[(i + 1) %users.length].id
  )
end


Friendship.destroy_all

Friendship.create!(friender_id: gob.id, friendee_id: michael.id, status: 1)
Friendship.create!(friender_id: michael.id, friendee_id: mike.id, status: 0)
