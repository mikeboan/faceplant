# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

puts "destroying users"
User.destroy_all

puts "creating users"
mike = User.create!(first_name: 'Mike', last_name: 'Fake', email: 'mike@fake.com', password: 'starwars')
michael = User.create!(first_name: 'Michael', last_name: 'Bluth', email: 'michael@bluth.com', password: 'starwars')
gob = User.create!(first_name: 'GOB', last_name: 'Bluth', email: 'gob@bluth.com', password: 'starwars')
buster = User.create!(first_name: 'Buster', last_name: 'Bluth', email: 'buster@bluth.com', password: 'starwars')

users = User.all.to_a

puts "destroying posts"
Post.destroy_all
p1 = Post.create!(content: "But where did the lighter fluid come from!?", poster_id: gob.id, postee_id: michael.id)


puts "creating user-user posts"
50.times do |i|
  Post.create!(
    content: "Post number #{i}",
    poster_id: users[i % users.length].id,
    postee_id: users[(i + 1) %users.length].id
  )
end

puts "creating self-posts"
50.times do |i|
  Post.create!(
    content: "Self-post number #{i}",
    poster_id: users[i % users.length].id,
    postee_id: nil
  )
end

puts "destroying friendships"
Friendship.destroy_all

puts "creating friendships"
# status => 0: pending, 1: accepted, 2: rejected
Friendship.create!(friender_id: gob.id, friendee_id: michael.id, status: 1)
Friendship.create!(friender_id: michael.id, friendee_id: mike.id, status: 0)
Friendship.create!(friender_id: buster.id, friendee_id: michael.id, status: 1)
Friendship.create!(friender_id: buster.id, friendee_id: gob.id, status: 2)
