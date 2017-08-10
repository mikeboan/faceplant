# == Schema Information
#
# Table name: profiles
#
#  id                  :integer          not null, primary key
#  workplace           :string
#  school              :string
#  location            :string
#  hometown            :string
#  relationship_status :string
#  user_id             :integer
#  work_title          :string
#  cover_photo_id      :integer
#

class Profile < ApplicationRecord
  validates :user_id, presence: true

  belongs_to :user
  has_many :posts

  belongs_to :cover_photo,
    foreign_key: :cover_photo_id,
    class_name: "Photo",
    optional: true

  def timeline_posts
    inclusions = [
      :user,
      :likers,
      :likes,
      profile: [user: :profile_pic],
      comments: [:likes, :likers, author: [:profile_pic]]
    ]

    Post.includes(*inclusions).where(user_id: user_id).or(
      Post.includes(*inclusions).where(id: posts.select(:id))
    )
  end
end
