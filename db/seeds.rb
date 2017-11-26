# # This file should contain all the record creation needed to seed the database with its default values.
# # The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
# #
# # Examples:
# #
# #   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
# #   Character.create(name: 'Luke', movie: movies.first)
#
puts "destroying users"
User.destroy_all

puts "destroying profiles"
Profile.destroy_all
puts "destroying photos"
Photo.destroy_all

puts "creating users"
mike = User.create!(first_name: 'Mike', last_name: 'Fake', email: 'mike@fake.com', password: 'starwars')
michael = User.create!(first_name: 'Michael', last_name: 'Bluth', email: 'michael@bluth.com', password: 'starwars')
gob = User.create!(first_name: 'GOB', last_name: 'Bluth', email: 'gob@bluth.com', password: 'starwars')
buster = User.create!(first_name: 'Buster', last_name: 'Bluth', email: 'buster@bluth.com', password: 'starwars')
annyong = User.create!(first_name: 'Annyong', last_name: 'Bluth', email: 'annyong@bluth.com', password: 'starwars')

users = User.all.to_a

puts "creating profiles"
mike.profile.update!(workplace: "App Academy", work_title: "Senior TA", hometown: "Garwood, NJ")
michael.profile.update!(workplace: "Bluth Company", work_title: "CEO", hometown: "Newport Beach, CA")
gob.profile.update!(workplace: "Magic Castle", work_title: "Magician", hometown: "Newport Beach, CA")
buster.profile.update!(workplace: "Milford School", work_title: "Student", hometown: "Newport Beach, CA")
annyong.profile.update!(workplace: "Hidden Room", work_title: "Mole", hometown: "Korea?")

profiles = Profile.all.to_a



puts "creating photos"
mike_profile_pic = Photo.create(image: "https://s3-us-west-2.amazonaws.com/faceplant-seeds/mike.png")
mike.update(profile_pic: mike_profile_pic)
michael_profile_pic = Photo.create(image: "https://s3-us-west-2.amazonaws.com/faceplant-seeds/michael-profile.jpg")
michael.update(profile_pic: michael_profile_pic)
gob_profile_pic = Photo.create(image: "https://s3-us-west-2.amazonaws.com/faceplant-seeds/gob-profile.jpg")
gob.update(profile_pic: gob_profile_pic)
buster_profile_pic = Photo.create(image: "https://s3-us-west-2.amazonaws.com/faceplant-seeds/buster-profile.jpg")
buster.update(profile_pic: buster_profile_pic)
annyong_profile_pic = Photo.create(image: "https://s3-us-west-2.amazonaws.com/faceplant-seeds/annyong-profile.jpg")
annyong.update(profile_pic: annyong_profile_pic)


puts "destroying posts"
Post.destroy_all
puts "creating posts"
lighter_fluid = Post.create!(body: "But where did the lighter fluid come from!?", author_id: gob.id, profile_id: michael.profile.id)
milford_man = Post.create!(body: "You can always tell a Milford Man", author_id: gob.id, profile_id: buster.profile.id)
milford_man_reverse = Post.create!(body: "You can always tell a Milford Man (reverse)", author_id: buster.id, profile_id: gob.profile.id)
hey_brother = Post.create!(body: "Hey, brother!", author_id: buster.id, profile_id: michael.profile.id)
hey_hermano = Post.create!(body: "Hey, hermano!", author_id: buster.id, profile_id: gob.profile.id)





# puts "creating profile posts"
# 50.times do |i|
#   Post.create!(
#     body: "Post number #{i}",
#     author_id: users[i % users.length].id,
#     profile_id: profiles[(i + 1) % profiles.length].id
#   )
# end
#
# puts "creating selfposts"
# 50.times do |i|
#   Post.create!(
#     body: "Self-post number #{i}",
#     author_id: users[i % users.length].id,
#     profile_id: profiles[i % profiles.length].id
#   )
# end

puts "destroying friendships"
Friendship.destroy_all

puts "creating friendships"
# status => 0: pending, 1: accepted, 2: rejected
Friendship.create!(friender_id: gob.id, friendee_id: michael.id, status: 1)
Friendship.create!(friender_id: michael.id, friendee_id: mike.id, status: 0)
Friendship.create!(friender_id: buster.id, friendee_id: michael.id, status: 1)
Friendship.create!(friender_id: buster.id, friendee_id: gob.id, status: 1)


puts "destroying comments"
Comment.destroy_all

puts "creating comments"
Post.all.each do |post|
  Comment.create!(body: "Annyong!", author_id: annyong.id, commentable: post)
  Comment.create!(body: "Comment1", author_id: michael.id, commentable: post)
  Comment.create!(body: "Comment2", author_id: michael.id, commentable: post)
  Comment.create!(body: "Comment3", author_id: michael.id, commentable: post)
end


puts "Creating nested comments"
post1 = Post.first
mike = User.first
5.times do |i|
  c1 = Comment.create!(body: "1st level #{i}", author: mike, commentable: post1)
  4.times do |j|
    c2 = Comment.create!(body: "2nd level #{j} respoonding to 1st level #{i}", parent: c1, author: mike, commentable: post1)
    3.times do |k|
      c3 = Comment.create!(body: "3rd level #{k} respoonding to 2nd level #{j}", parent: c2, author: mike, commentable: post1)
      2.times do |l|
        Comment.create!(body: "4th level #{l} respoonding to 3rd level #{k}", parent: c3, author: mike, commentable: post1)
      end
    end
  end
end
