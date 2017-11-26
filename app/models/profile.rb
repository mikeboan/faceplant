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

  after_create :create_cover_photo!

  belongs_to :user
  has_many :posts

  belongs_to :cover_photo,
    foreign_key: :cover_photo_id,
    class_name: "Photo",
    optional: true

  def timeline_posts
    inclusions = [
      :author,
      :likers,
      :likes,
      :top_level_comments,
      profile: [user: :profile_pic],
      comments: [:likes, :likers, :replies, author: [:profile_pic]]
    ]

    Post.includes(*inclusions).where(author_id: user_id).or(
      Post.includes(*inclusions).where(id: posts.select(:id))
    )
  end

  private

	def create_cover_photo!
		cover_photo = Photo.create!(image: Photo::DEFAULT_COVER_PHOTO_URL)
		self.update!(cover_photo: cover_photo)
    puts self.cover_photo.url
	end
end
